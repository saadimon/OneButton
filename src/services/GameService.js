import firestore from '@react-native-firebase/firestore';
import data from '../data';
import BUTTON_RESPONSE from '../data/enums/ButtonResponse';
import GAME_STATUS from '../data/enums/GameStatus';
import AuthService from './AuthService';
const gamesRef = firestore().collection('Games');
const usersRef = firestore().collection('Users');

export const createGameObject = name => {
  const userId = AuthService.getOwnUid();
  return {
    name,
    players: [userId],
    status: GAME_STATUS.ACTIVE,
    creator: userId,
    count: 0,
  };
};

export default class GameService {
  static getActiveGames = () =>
    new Promise((resolve, reject) => {
      gamesRef
        .where('status', '==', GAME_STATUS.ACTIVE)
        .get()
        .then(res => {
          resolve(data.getListOfDocsFromFirebaseQuery(res.docs));
        })
        .catch(e => {
          console.log(e);
          resolve([]);
        });
    });

  static listenToGame = gameId => gamesRef.doc(gameId).onSnapshot;
  static buttonClick = gameId =>
    new Promise((resolve, reject) => {
      const userId = AuthService.getOwnUid();
      const userDoc = usersRef.doc(userId);
      gamesRef
        .doc(gameId)
        .get()
        .then(doc => {
          const gameData = doc.data();
          if (gameData.count < 99) {
            /** Handle Normal Click */
            doc.ref.update({count: firestore.FieldValue.increment});
            userDoc.update({clicks: firestore.FieldValue.increment});
            resolve(BUTTON_RESPONSE.ADDED);
          } else if (gameData.count == 99) {
            /** Handle Win */
            doc.ref.update({
              count: firestore.FieldValue.increment,
              winner: userId,
              clicks: firestore.FieldValue.increment,
            });
            userDoc.update({gamesWon: firestore.FieldValue.increment});
          } else {
            /** Handle Game Completed Already */
            resolve(BUTTON_RESPONSE.TOO_LATE);
          }
        });
    });
  static joinGame = gameId =>
    new Promise(async resolve => {
      const userId = AuthService.getOwnUid();
      const userDoc = usersRef.doc(userId);
      const transaction1 = gamesRef.doc(gameId).update({
        players: firestore.FieldValue.arrayUnion(AuthService.getOwnUid()),
      });
      const transaction2 = userDoc.update({
        games: firestore.FieldValue.arrayUnion(gameId),
      });

      try {
        await Promise.all([transaction1, transaction2]);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });

  static createGame = name =>
    new Promise(resolve => {
      const userId = AuthService.getOwnUid();
      const userDoc = usersRef.doc(userId);
      try {
        const transaction1 = await gamesRef.add(createGameObject(name));
        const gameId = transaction1.id;
        await userDoc.update({
          games: firestore.FieldValue.arrayUnion(gameId),
        });
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });
}

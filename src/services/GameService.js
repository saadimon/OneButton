import firestore from '@react-native-firebase/firestore';
import data from '../data';
import BUTTON_RESPONSE from '../data/enums/ButtonResponse';
import GAME_STATUS from '../data/enums/GameStatus';
import AuthService from './AuthService';
import randomatic from 'randomatic';
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
    creation_date: firestore.FieldValue.serverTimestamp(),
    code: randomatic('A0', 6),
  };
};

export default class GameService {
  static getActiveGames = (limit = 10) =>
    new Promise(resolve => {
      gamesRef
        .where('status', '==', GAME_STATUS.ACTIVE)
        .limit(limit)
        .get()
        .then(res => {
          resolve(data.getListOfDocsFromFirebaseQuery(res.docs));
        })
        .catch(e => {
          console.log(e);
          resolve([]);
        });
    });

  static getMyGames = (limit = 10) =>
    new Promise(resolve => {
      gamesRef
        .where('players', 'array-contains', AuthService.getOwnUid())
        .limit(limit)
        .get()
        .then(res => {
          resolve(data.getListOfDocsFromFirebaseQuery(res.docs));
        })
        .catch(e => {
          console.log(e);
          resolve([]);
        });
    });

  // static listenToGame = gameId => gamesRef.doc(gameId).onSnapshot;
  static buttonClick = gameId =>
    new Promise(async (resolve, reject) => {
      const userId = AuthService.getOwnUid();
      const userDocRef = usersRef.doc(userId);
      try {
        const userDoc = await usersRef.doc(userId).get();
        const userData = userDoc.data();
        const gameDoc = await gamesRef.doc(gameId).get();
        const gameData = gameDoc.data();
        const clickNumber = gameData.count + 1;
        if (clickNumber < 100) {
          /**Handle Regular Click */
          const userUpdateObj = {
            clicks: firestore.FieldValue.increment(1),
          };
          if (userData.clickMap) {
            if (typeof userData.clickMap[clickNumber] == 'number')
              userUpdateObj[`clickMap.${clickNumber}`] =
                firestore.FieldValue.increment(1);
            else userUpdateObj[`clickMap.${clickNumber}`] = 1;
          } else {
            userUpdateObj.clickMap = {};
            userUpdateObj.clickMap[`${clickNumber}`] = 1;
          }
          gameDoc.ref.update({count: firestore.FieldValue.increment(1)});
          userDocRef.update(userUpdateObj);
          return resolve(BUTTON_RESPONSE.ADDED);
        } else if (clickNumber == 100) {
          /** Handle Win */
          const userUpdateObj = {
            clicks: firestore.FieldValue.increment(1),
            gamesWon: firestore.FieldValue.increment(1),
          };
          if (userData.clickMap) {
            if (typeof userData.clickMap[clickNumber] == 'number')
              userUpdateObj[`clickMap.${clickNumber}`] =
                firestore.FieldValue.increment(1);
            else userUpdateObj[`clickMap.${clickNumber}`] = 1;
          } else {
            userUpdateObj.clickMap = {};
            userUpdateObj.clickMap[`${clickNumber}`] = 1;
          }
          gameDoc.ref.update({
            count: firestore.FieldValue.increment(1),
            winner: userId,
            status: GAME_STATUS.COMPLETED,
          });
          userDocRef.update(userUpdateObj);
          return resolve(BUTTON_RESPONSE.GAME_WIN);
        } else if (clickNumber > 100) {
          /** Handle Too Late */
          return resolve(BUTTON_RESPONSE.TOO_LATE);
        }
      } catch (e) {
        console.error(e);
        return resolve(BUTTON_RESPONSE.ERROR);
      }
    });

  static findGameFromCode = code =>
    new Promise(resolve => {
      gamesRef
        .where('code', '==', code)
        .where('status', '==', GAME_STATUS.ACTIVE)
        .get()
        .then(docs => {
          const game = data.getDataFromFirebaseDoc(docs.docs[0]);
          resolve(game);
        })
        .catch(e => {
          console.log(e);
          resolve(false);
        });
    });

  static joinGame = gameId =>
    new Promise(async resolve => {
      const userId = AuthService.getOwnUid();
      console.log(AuthService.getOwnUid());
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
    new Promise(async resolve => {
      const userId = AuthService.getOwnUid();
      const userDoc = usersRef.doc(userId);
      try {
        const transaction1 = await gamesRef.add(createGameObject(name));
        const gameId = transaction1.id;
        await userDoc.update({
          games: firestore.FieldValue.arrayUnion(gameId),
        });
        resolve(transaction1.id);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });

  static getHighScores = (prevDoc, limit = 10) =>
    new Promise(resolve => {
      usersRef
        .orderBy('gamesWon', 'desc')
        .limit(10)
        // .startAfter(prevDoc)
        .get()
        .then(docs => resolve(data.getListOfDocsFromFirebaseQuery(docs)))
        .catch(e => resolve([]));
    });
}

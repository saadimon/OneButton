import firestore from '@react-native-firebase/firestore';
import data from '../data';
import BUTTON_RESPONSE from '../data/enums/ButtonResponse';
import GAME_STATUS from '../data/enums/GameStatus';
import AuthService from './AuthService';
import randomatic from 'randomatic';
import {http} from '../util/http';
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
      try {
        const res = await http.post('buttonClick', {gameId, userId});
        return resolve(res);
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
      try {
        const res = await http.post('createGame', {userId, gameName: name});
        const gameId = res;
        resolve(gameId);
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

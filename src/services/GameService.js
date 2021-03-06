import firestore from '@react-native-firebase/firestore';
import data from '../data';
import BUTTON_RESPONSE from '../data/enums/ButtonResponse';
import GAME_STATUS from '../data/enums/GameStatus';
import AuthService from './AuthService';
import randomatic from 'randomatic';
import {http} from '../util/http';
const gamesRef = firestore().collection('Games');
const usersRef = firestore().collection('Users');

export default class GameService {
  static getGame = gameId =>
    new Promise(resolve => {
      gamesRef
        .doc(gameId)
        .get()
        .then(doc => resolve(data.getDataFromFirebaseDoc(doc)))
        .catch(e => {
          console.log(e);
          resolve(false);
        });
    });

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
        // .where('status', '==', GAME_STATUS.ACTIVE)
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

  static resetGame = gameId =>
    new Promise(async resolve => {
      try {
        const res = await http.post('resetGame', {gameId});
        resolve(gameId);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    });

  static getAllTimeHighScores = (prevDoc, limit = 10) =>
    new Promise(resolve => {
      usersRef
        .orderBy('gamesWon', 'desc')
        .limit(limit)
        // .startAfter(prevDoc)
        .get()
        .then(docs => resolve(data.getListOfDocsFromFirebaseQuery(docs)))
        .catch(e => resolve([]));
    });

  static getDailyHighScores = (prevDoc, limit = 10) =>
    new Promise(resolve => {
      usersRef
        .orderBy('dailyWins', 'desc')
        .limit(limit)
        // .startAfter(prevDoc)
        .get()
        .then(docs => resolve(data.getListOfDocsFromFirebaseQuery(docs)))
        .catch(e => resolve([]));
    });

  static getWeeklyHighScores = (prevDoc, limit = 10) =>
    new Promise(resolve => {
      usersRef
        .orderBy('weeklyWins', 'desc')
        .limit(limit)
        // .startAfter(prevDoc)
        .get()
        .then(docs => resolve(data.getListOfDocsFromFirebaseQuery(docs)))
        .catch(e => resolve([]));
    });

  static getMonthlyHighScores = (prevDoc, limit = 10) =>
    new Promise(resolve => {
      usersRef
        .orderBy('monthlyWins', 'desc')
        .limit(limit)
        // .startAfter(prevDoc)
        .get()
        .then(docs => resolve(data.getListOfDocsFromFirebaseQuery(docs)))
        .catch(e => resolve([]));
    });
}

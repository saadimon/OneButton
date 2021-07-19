const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore;

const usersRef = firestore().collection('Users');
const gamesRef = firestore().collection('Games');
import BUTTON_RESPONSE from '../../src/data/enums/ButtonResponse';
import GAME_STATUS from '../../src/data/enums/GameStatus';

exports.buttonClick = functions.https.onRequest(async (req, res) => {
  const {userId, gameId} = req.body;
  if (!userId || !gameId) return res.status(400).send();
  const userDoc = usersRef.doc(userId);
  const gameDoc = await gamesRef.doc(gameId).get();
  const gameData = gameDoc.data();
  if (gameData.count < 99) {
    /**Handle Regular click */
    gameDoc.ref.update({
      count: firestore.FieldValue.increment(1),
    });
    userDoc.update({clicks: firestore.FieldValue.increment(1)});
    return res.status(200).send(BUTTON_RESPONSE.ADDED);
  } else if (gameData.count == 99) {
    /** Handle Win */
    gameDoc.ref.update({
      count: firestore.FieldValue.increment(1),
      winner: userId,
      status: GAME_STATUS.COMPLETED,
    });
    userDoc.update({
      gamesWon: firestore.FieldValue.increment(1),
      clicks: firestore.FieldValue.increment(1),
    });
    return res.status(200).send(BUTTON_RESPONSE.GAME_WIN);
  } else if (gameData.count > 99) {
    return res.status(200).send(BUTTON_RESPONSE.TOO_LATE);
  }
});

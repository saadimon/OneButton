const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore;
const usersRef = firestore().collection('Users');
const gamesRef = firestore().collection('Games');

const BUTTON_RESPONSE = {
  ADDED: 'added',
  GAME_WIN: 'win',
  TOO_LATE: 'game ended',
  ERROR: 'error',
};

const GAME_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

exports.buttonClick = functions.https.onRequest(async (req, res) => {
  const {userId, gameId} = req.body;
  if (!userId || !gameId) return res.status(400).send();
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
      return res.status(200).send(BUTTON_RESPONSE.ADDED);
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
      return res.status(200).send(BUTTON_RESPONSE.GAME_WIN);
    } else if (clickNumber > 100) {
      /** Handle Too Late */
      return res.status(200).send(BUTTON_RESPONSE.TOO_LATE);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(BUTTON_RESPONSE.ERROR);
  }
});

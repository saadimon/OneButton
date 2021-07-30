const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore;
const usersRef = firestore().collection('Users');
const gamesRef = firestore().collection('Games');
const randomatic = require('randomatic');

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

const GameCountIncrementInterval = 10; //seconds

const getDifferenceInTenSeconds = (date1, date2) => {
  const diffInSec = Math.abs(
    Math.floor(date2.getTime() / 1000) - date1.seconds,
  );
  return Math.floor(diffInSec / 10);
};

const createGameObject = (name, userId) => ({
  name,
  players: [userId],
  status: GAME_STATUS.ACTIVE,
  creator: userId,
  count: 0,
  // creation_date: firestore.FieldValue.serverTimestamp(),
  code: randomatic('A0', 6),
  creationDate: new Date(),
});

const calculateScore = gameData => {
  const {count, creationDate, status} = gameData;
  const timeDiffInTenSec = getDifferenceInTenSeconds(creationDate, new Date());
  let timeCount = Math.floor(timeDiffInTenSec);
  const totalScore = count + timeCount;
  if (totalScore > 99) {
    if (status == GAME_STATUS.ACTIVE) {
      return 99;
    }
    if (status == GAME_STATUS.COMPLETED) return 100;
  }
  return totalScore;
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
    const totalScore = calculateScore(gameData);
    const clickNumber = totalScore + 1;
    if (clickNumber < 100) {
      /**Handle Regular Click */
      const userUpdateObj = {
        weeklyClicks:
          typeof userData.weeklyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        monthlyClicks:
          typeof userData.monthlyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        dailyClicks:
          typeof userData.dailyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
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
        weeklyClicks:
          typeof userData.weeklyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        monthlyClicks:
          typeof userData.monthlyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        dailyClicks:
          typeof userData.dailyClicks == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        weeklyWins:
          typeof userData.weeklyWins == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        monthlyWins:
          typeof userData.monthlyWins == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
        dailyWins:
          typeof userData.dailyWins == 'number'
            ? firestore.FieldValue.increment(1)
            : 1,
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

exports.resetDailyCounter = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('America/New_York')
  .onRun(() => {
    usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc =>
          doc.ref
            .update({dailyClicks: 0, dailyWins: 0})
            .catch(e => console.error(e)),
        );
      })
      .catch(e => console.error(e));
  });

exports.resetWeeklyCounter = functions.pubsub
  .schedule('0 0 * * 1')
  .timeZone('America/New_York')
  .onRun(() => {
    usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc =>
          doc.ref
            .update({weeklyClicks: 0, weeklyWins: 0})
            .catch(e => console.error(e)),
        );
      })
      .catch(e => console.error(e));
  });

exports.resetMonthlyCounter = functions.pubsub
  .schedule('0 0 * * 1')
  .timeZone('America/New_York')
  .onRun(() => {
    usersRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc =>
          doc.ref
            .update({monthlyClicks: 0, monthlyWins: 0})
            .catch(e => console.error(e)),
        );
      })
      .catch(e => console.error(e));
  });

exports.createGame = functions.https.onRequest(async (req, res) => {
  const {userId, gameName} = req.body;
  const userDoc = usersRef.doc(userId);
  try {
    const transaction1 = await gamesRef.add(createGameObject(gameName, userId));
    const gameId = transaction1.id;
    await userDoc.update({
      games: firestore.FieldValue.arrayUnion(gameId),
    });

    return res.status(200).send(transaction1.id);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
});

exports.resetGame = functions.https.onRequest(async (req, res) => {
  const {gameId} = req.body;
  try {
    await gamesRef
      .doc(gameId)
      .update({creationDate: new Date(), count: 0, winner: ''});
    return res.status(200).send(gameId);
  } catch (e) {
    console.error(e);
    return res.status(500).send();
  }
});

import util from '../util';
import GAME_STATUS from './enums/GameStatus';

const data = {
  getListOfDocsFromFirebaseQuery: docs => {
    const result = [];
    docs.forEach(doc => result.push({...doc.data(), id: doc.id}));
    return result;
  },
  getDataFromFirebaseDoc: doc => ({...doc.data(), id: doc.id}),
  getMostClicksForUser: user => {
    if (!user.clickMap) return -1;
    let highestClicks;
    Object.keys(user.clickMap).forEach(number => {
      if (!highestClicks) highestClicks = number;
      if (user.clickMap[number] > user.clickMap[highestClicks])
        highestClicks = number;
    });
    return highestClicks;
  },
  calculateScore: gameData => {
    const {count, creationDate, status} = gameData;
    const timeDiffInTenSec = util.getDifferenceInTenSeconds(
      creationDate,
      new Date(),
    );
    let timeCount = Math.floor(timeDiffInTenSec);
    const totalScore = count + timeCount;
    if (totalScore > 99) {
      if (status == GAME_STATUS.ACTIVE) {
        return 99;
      }
      if (status == GAME_STATUS.COMPLETED) return 100;
    }
    console.log(totalScore);
    return totalScore;
  },
};

export default data;

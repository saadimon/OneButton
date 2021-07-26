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
};

export default data;

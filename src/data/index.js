const data = {
  getListOfDocsFromFirebaseQuery: docs => {
    const result = [];
    docs.forEach(doc => result.push({...doc.data(), id: doc.id}));
    return result;
  },
  getDataFromFirebaseDoc: doc => ({...doc.data(), id: doc.id}),
};

export default data;

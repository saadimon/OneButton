const data = {
  getListOfDocsFromFirebaseQuery: docs => {
    const result = [];
    docs.forEach(doc => result.push({...doc.data(), id: doc.id}));
    return result;
  },
};

export default data;

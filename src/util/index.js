const util = {
  getDifferenceInTenSeconds: (date1, date2) => {
    const diffInSec = Math.abs(
      Math.floor(date2.getTime() / 1000) - date1.seconds,
    );
    return Math.floor(diffInSec / 10);
  },
};

export default util;

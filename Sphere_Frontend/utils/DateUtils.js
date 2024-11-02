// utils/DateUtils.js
export const isOlderThan24Hours = (postDate) => {
    const currentTime = new Date();
    const hoursElapsed = Math.abs(currentTime - postDate) / 36e5;
    return hoursElapsed > 24;
  };
  
const chunkArray = (myArray, chunk_size) => {
  if (myArray.length < 1) return;
  let results = [];
  while (myArray.length) {
    results = [...results, myArray.splice(0, chunk_size)];
  }
  return results;
};

export default chunkArray;

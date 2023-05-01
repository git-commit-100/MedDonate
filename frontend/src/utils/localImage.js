const localImage = (serverPath) => {
  // turn chrome extension on
  let LocalImagePath = "http://127.0.0.1:8887/";
  let imageName = serverPath.split("uploads\\");

  return LocalImagePath + imageName[1];
};

export default localImage;

const rootDir = require("../utils/path");
const path = require("path");

const uploadImage = (req, res, cb) => {
  // uploading image
  // The name of the input field (i.e. "medImg") is used to retrieve the uploaded file
  let medImg = req.files.medImg;

  // constructing upload path
  let uploadPath = path.join(
    rootDir,
    "uploads",
    `${Date.now() + path.extname(req.files.medImg.name)}`
  );

  // Use the mv() method to place the file somewhere on your server
  // here in -> uploads
  medImg.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });

  return uploadPath;
};

module.exports = uploadImage;

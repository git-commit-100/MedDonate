// getting root file from directory irrespective of OS

// .main -> entry point for application

const path = require("path");

module.exports = path.dirname(require.main.filename);
var path = require("path");

module.exports = function(app) {
    app.get("/", function (_req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  app.get("/notes", function (_req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
  app.get("*", function (_req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  };
const express = require('express');
const serverless = require('serverless-http');
const expressApp = express();
const router = express.Router();

expressApp.use(express.static("client"));

expressApp.get("/:chord", (req, res) => {
  const chord: string = req.params.chord;
  if (!chord || chord.length <= 0) {
    res.sendStatus(500);
  }
  res.status(200).send(`https://ukutabs.com/chords/standard/${chord}.svg`);
  return;
});

expressApp.listen(process.env.PORT, () => {
  console.log(`Static server is listening on port ${process.env.PORT}`);
});

expressApp.use('/.netlify/functions/server', router);

module.exports = expressApp;
module.exports.handler = serverless(expressApp);
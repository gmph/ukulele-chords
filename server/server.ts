const express = require('express');
const serverless = require('serverless-http');

const expressApp = express();
expressApp.use(express.static("client"));

const router = express.Router();
router.get("/:chord", (req, res) => {
  const chord: string = req.params.chord;
  if (!chord || chord.length <= 0) {
    res.sendStatus(500);
  }
  res.status(200).send(`https://ukutabs.com/chords/standard/${chord}.svg`);
  return;
});

expressApp.use('/.netlify/functions/server', router);

module.exports = expressApp;
module.exports.handler = serverless(expressApp);
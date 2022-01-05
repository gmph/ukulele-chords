import * as request from "request";
import * as express from "express";
const expressApp = express();

expressApp.use(express.static("client"));

expressApp.get("/:chord", (req, res) => {
  const chord: string = req.params.chord;
  const chordDomain = "https://ukulele-chords.com";
  if (!chord || chord.length <= 0) {
    res.sendStatus(500);
  }
  res.status(200).send(`https://ukutabs.com/chords/standard/${chord}.svg`);
  return;
});

const expressAppServer = expressApp.listen(process.env.PORT, () => {
  console.log(`Static server is listening on port ${process.env.PORT}`);
});

"use strict";
exports.__esModule = true;
var express = require("express");
var expressApp = express();
expressApp.use(express.static("client"));
expressApp.get("/:chord", function (req, res) {
    var chord = req.params.chord;
    var chordDomain = "https://ukulele-chords.com";
    if (!chord || chord.length <= 0) {
        res.sendStatus(500);
    }
    res.status(200).send("https://ukutabs.com/chords/standard/".concat(chord, ".svg"));
    return;
});
var expressAppServer = expressApp.listen(process.env.PORT, function () {
    console.log("Static server is listening on port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map
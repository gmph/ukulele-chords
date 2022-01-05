var express = require('express');
var serverless = require('serverless-http');
var expressApp = express();
expressApp.use(express.static("client"));
var router = express.Router();
router.get("/:chord", function (req, res) {
    var chord = req.params.chord;
    if (!chord || chord.length <= 0) {
        res.sendStatus(500);
    }
    res.status(200).send("https://ukutabs.com/chords/standard/".concat(chord, ".svg"));
    return;
});
expressApp.use('/.netlify/functions/server', router);
module.exports = expressApp;
module.exports.handler = serverless(expressApp);
//# sourceMappingURL=server.js.map
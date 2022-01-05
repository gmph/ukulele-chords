var express = require('express');
var serverless = require('serverless-http');
var expressApp = express();
var router = express.Router();
expressApp.use(express.static("client"));
expressApp.get("/:chord", function (req, res) {
    var chord = req.params.chord;
    if (!chord || chord.length <= 0) {
        res.sendStatus(500);
    }
    res.status(200).send("https://ukutabs.com/chords/standard/".concat(chord, ".svg"));
    return;
});
expressApp.listen(process.env.PORT, function () {
    console.log("Static server is listening on port ".concat(process.env.PORT));
});
expressApp.use('/.netlify/functions/server', router);
module.exports = expressApp;
module.exports.handler = serverless(expressApp);
//# sourceMappingURL=server.js.map
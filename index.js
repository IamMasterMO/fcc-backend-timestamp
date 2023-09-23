// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  const queryDate = req.params.date || "";
  let unixDate;

  // unix時間もミリ秒で

  if (queryDate === "") {             // 空文字なら
    unixDate = new Date().getTime();
  } else if (!isNaN(queryDate)) {         // 数値（unix?）なら
    unixDate = parseInt(queryDate);
  } else {                           // 文字列なら
    unixDate = new Date(queryDate).getTime();
  }

  if (isNaN(unixDate)) {
    res.status(400).json({ error : "Invalid Date"});
  } else {
    const utcDate = new Date(unixDate).toUTCString();
    res.json({
      "unix": unixDate,
      "utc": utcDate
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

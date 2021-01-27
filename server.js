var express = require("express");
var path = require("path");
var fs = require("fs");
var dbjson = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
require("./routes/api/notes")(app);
require("./routes/html")(app);

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/notes', function(_req,res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


app.get('/routes/api/notes', function(_req,res) {
    fs.readFile('./db/db.json', 'utf8', function(err,_data) {
        if (err){
            throw err;
        }
    });
    res.json(dbjson);
});

app.post('/routs/api/notes', function(req,res) {
    var newpost = req.body;

    function addNewPost(post) {
        dbjson.push(post);
        for(let i=0;i<dbjson.length;i++) {
            dbjson[i].id = i;
        }
        return JSON.stringify(dbjson);
    }
    fs.writeFile('./db/db.json', addNewPost(newpost), function(err) {
        if (err){
            throw err;
        }
    });
    res.json(dbjson);
});
app.delete('/routs/api/notes/:id', function(req,res) {
    var noteId = req.params.id;

    dbjson.splice(noteId,1);

    for(let i=0;i<dbjson.length;i++) {
        dbjson[i].id = i;
    }
    fs.writeFile('./db/db.json', JSON.stringify(dbjson), function(err) {
        if (err){
            throw err;
        }
    });
    res.json(dbjson);
});




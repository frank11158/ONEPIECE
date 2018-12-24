const express = require('express')
const app = express()
const port = 8888
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./DB/OP.db')

db.serialize(function(){
    db.run("CREATE TABLE IF NOT EXISTS usr_pw (name TEXT, pw TEXT, PRIMARY KEY(`name`))")
    db.run("CREATE TABLE IF NOT EXISTS `score_record` (`name`	TEXT NOT NULL, `score`	INTEGER DEFAULT 0, PRIMARY KEY(`name`))")
})

app.get('/regis', function(req, res){
    var sql = "INSERT INTO usr_pw VALUES( ?, ?)"
    var sql2 = "INSERT INTO score_record VALUES( ?, 0)"
    var checkSQL = "SELECT name FROM usr_pw where name = ?"
    db.all(checkSQL, req.query.usrName, function(err, rows){
        if (err) {
            throw err;
        }else if(req.query.pw != req.query.pw_re){
            res.send("inconsistent password")

        }else{
            if(rows.length == 0){
                db.run(sql, req.query.usrName, req.query.pw)
                db.run(sql2, req.query.usrName)
                res.send("user created")
            }else{
                res.send("user already exist")
            }
            console.log(rows.length)
        }
        res.end()
    })
})

app.get('/score_update', function(req, res){
    var sql = "UPDATE score_record SET 'score' = ? WHERE name = ?"
    db.run(sql, req.query.score, req.query.usrName)
    res.end()
})

app.get('/checkScore', function(req, res){
    var sql = "SELECT score FROM score_record WHERE name = ?"
    var sc = 0
    db.all(sql, req.query.usrName, function(err, rows){
        if (err) {
            throw err;
        }
        sc = rows[0]
    })
    res.send(sc)
})

app.get('/signIn', function(req, res){
    var sql = "SELECT password FROM usr_pw where name = ?"
    db.all(sql, req.query.usrName, function(err, psw){
        var resData;
        if (err) {
            throw err;
        }
        if(psw.length == 0)//user not exist
            resData= {state: 0}
        else{
            if(psw[0].password == req.query.pw)
                resData= {state: 1, name: req.query.usrName}
            else
                resData= {state: 2, name: req.query.usrName}
            //console.log(psw[0].password, req.query.pw)
        }
        res.send(resData)
        res.end()
    })
})

app.get('/changePW', function(req, res){
    var checkSQL = "SELECT password FROM usr_pw where name = ?"
    var sql = "UPDATE usr_pw SET 'password' = ? WHERE name = ?"
    db.all(checkSQL, req.query.usrName, function(err, rows){
        var resData;
        if (err) {
            throw err;
        }
        if(rows.length == 0)
            resData= {state: 0}
        else{
            if(rows[0].password == req.query.old_pw){
                resData= {state: 1}
                db.run(sql, req.query.new_pw, req.query.usrName)
            }
            else
                resData= {state: 2}
        }
        res.send(resData)
    })
})

app.use(express.static(`${__dirname}`))
app.listen(port, () => {
    console.log('Listening on port' + port)
})

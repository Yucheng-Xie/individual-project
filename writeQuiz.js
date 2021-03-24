const http = require('http');
const url = require('url');
const mysql = require("mysql");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8888;
const endPointRoot = "/API/v1/"

const con = mysql.createConnection({
    host: "localhost",
    user: "yuchengx_Individual-Project",
    password: "300145841",
    database: "yuchengx_Individual-Project"
});

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');
    next();                                
});




app.post("/COMP351/project/individual-project/WRITEDB/API/v1/deleteData/",(req,res) => {
    const q = url.parse(req.url, true);
    const qdata = q.query;
    let questionid = qdata.questionid;    
    let sql = `DELETE FROM quiz WHERE questionid = (?)`;
    let data = [questionid];    
    con.query(sql, data, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
    }); 
    res.end("Data has been deleted!")
});

app.post("/COMP351/project/individual-project/WRITEDB/API/v1/postData/",(req,res) => {  
    const q = url.parse(req.url, true);
    const qdata = q.query;
    let questionid = qdata.questionid;    
    let question = qdata.question;
    let answerA = qdata.answerA;
    let answerB = qdata.answerB;
    let answerC = qdata.answerC;
    let answerD = qdata.answerD;
    let answerkey = qdata.answerkey;
    
    let sql = `INSERT INTO quiz(questionid, question, answerA, answerB, answerC, answerD, answerkey) values (?,?,?,?,?,?,?)`;
    let data = [questionid, question, answerA, answerB, answerC, answerD, answerkey];
    con.query(sql, data, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });   
    res.end("Data has been saved!")
});

app.get("/COMP351/project/individual-project/WRITEDB/API/v1/get-quiz-content/",(req,res) => {
    let sql = `SELECT * FROM quiz WHERE 1`;
    con.query(sql, function(err,result){
        if(err) throw err;
        let word = '';
        let countArray=[];
        let point =0;
        for(let i=0;i<result.length; i++){
            countArray.push(result[i].questionid)
            word += "<br>" + result[i].question+"<br>"+ "<input type='radio' id='a1' name= 'a"+result[i].questionid+"'>" + result[i].answerA+"<br>"+ "<input type='radio' id='a2'>" + result[i].answerB
            +"<br>"+ "<input type='radio' id='a3"+result[i].questionid+"'>" + result[i].answerC+"<br>"+ "<input type='radio' id='a4'>" + result[i].answerD+"<br>";
            
        }
        res.send(word);
        
    });
});

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("Listening to port", PORT);
});

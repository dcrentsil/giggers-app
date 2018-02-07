const jwtConstants = require('./jwtConstants');
const jwt = require('jsonwebtoken');
var promise = require('bluebird');
const bcrypt = require('bcryptjs'); 

const issueJWT = (user) => {
    return jwt.sign({'type': 'auth'},
    jwtConstants.jwtSecret,
    {issuer: jwtConstants.appTLD,
    subject: gigger,
    algorithm: jwtConstants.jwtAlgo,
    expiresIn: jwtConstants.jwtExpiration
    }
  );
}
var Pool = require('pg-pool');
const pg = require('pg');

var pool = new pg.Pool({
    user: 'docker',
    host: 'postgres',
    database: 'giggersdb',
    password: 'jackpot',
    port: 5432,
});

function creategigger(req, res, next) {
    var newUser = req.body;
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
db.query(`INSERT INTO giggers(type, name, username, email, password, speciality, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [newUser.type, newUser.name, newUser.username, 
            newUser.email, newUser.password, newUser.speciality, 
            newUser.description]) 
        .then(function () { 
            res.status(200)
            .json({
                status: 'SUCCESS!!',
                message: 'Added one gigger to thde database'
            });
            // issueJWT({id: data._id});
            // res.status(200).send({ auth: true, token: token });
            })
        .catch(function (err) {
            console.log("something weird just happened:"+ err);
            return next(err);
        });
    });
 }

function getallgiggers(req, res, next){
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
        db.query('SELECT * FROM giggers')
        .then(function (data) {
            if (data.length === 0 ){
                res.status(404);
                return Promise.reject("404 No giggers found");
            }
            res.status(200)
            .json({
                status: 'Success!!',
                data: data.rows,
                message: 'Retrieved all the giggers in the database'
            });
        })
        .catch(function (err) {
            return next(err);
        });
    });
}

//lets get all the gigs/employers
function getallgigs(req, res, next) {
    var typearr = ['employer'];
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
        db.query('SELECT * FROM giggers WHERE type IN ($1)', typearr)
        .then(function (data) {
            if (data.length === 0 ){
                res.status(404);
                return Promise.reject("404 No gigs found");
            }
            res.status(200)
            .json({
                status: 'Success!!',
                data: data.rows,
                message: 'Retrieved all the available gigs in the database'
            });
        })
        .catch(function (err) {
            return next(err);
        });
    });
}

function getonegigger(req, res, next) {
    var giggerID = parseInt(req.params.id);
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
        db.query('SELECT * FROM giggers WHERE id = $1 LIMIT 1', [giggerID])
        .then(function (data) {
            if(data.length === 0 ){
                res.status(404)
                return Promise.reject("404 Nothing found");
            }
            res.status(200)
            .json({
                status: 'Success!!',
                data: data,
                message: 'Retrieve ONE gigger from database'
            });
        })
        .catch(function (err) {
            return next(err);
        });
    });
 }

function updategigger(req, res, next) { 
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
        db.query('UPDATE GIGGERS set type=$1, name=$2, username=$3, email=$4, password=$5, speciality=$6, description=$7',
        [req.body.type, req.body.name, req.body.username,
            req.body.email, req.body.password, 
            req.body.speciality, req.body.description], 
            parseInt(req.params.id))
            .then(function () {
                res.status(200)
                .json({
                    status: 'SUCCESS!!',
                    message: 'GIGGER EDITED'
                });
            })
            .catch(function (err) {
                return next(err);
            });
        });
}

function removegigger(req, res, next) { 
    var giggerID = parseInt(req.params.id);
    pool.connect((err, db, done) => {
        if(err){
            return console.log(err);
        }
        db.query('DELETE FROM giggers where id = $1', [giggerID])
        .then(function (result) {
            res.status(200)
            .json({
                status: 'SUCCESS!!',
                message: 'Removed ${result} gigger'
            });
        })
        .catch(function (err) {
            return next(err);
        });
    });
}


// function login(req, res, next) {
//     var giggerpass = req.body.password;
//     var giggeruser = req.body.username;
//     pool.connect((err, db, done) => {
//     if(err){
//         return console.log(err);
//     }
//     db.query('SELECT * FROM giggers WHERE username = $1', [giggeruser])
//     .then(function (results){    
//     var IsValid = bcrypt.compareSync(giggerpass, results.password);
//      if (!IsValid){
//          return res.status(401).send({ auth: false, token: null});
//      }
//      var token = issueJWT({ id: results._id});
//      res.status(200).send({ auth: true, token: token });
//     })
//     .catch(function (err) {
//         return next(err);
//     });
// });
// }



module.exports = {
    getallgiggers: getallgiggers,
    getonegigger: getonegigger,
    getallgigs: getallgigs,
    creategigger: creategigger,
    updategigger: updategigger,
    removegigger: removegigger,
  //  login : login
};


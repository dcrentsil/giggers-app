var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var dbconnection = 'postgres://localhost:5432/giggersdb';
var db = pgp(dbconnection);

// add query functions
//lets make a gigger
function creategigger(req, res, next) {
    db.none('INSERT INTO giggers(type, name, username, speciality, description)' +
            'VALUES(${type}, ${name}, ${username}, ${speciality}, ${description})',
    req.body)
    .then(function () {
        res.status(200)
        .json({
            status: 'SUCCESS!!',
            message: 'Added one gigger to the database'
        });
    })
    .catch(function (err) {
        return next(err);
    });
 };

//lets get all the giggers
function getallgiggers(req, res, next){
    db.any('SELECT * FROM giggers')
    .then(function (data) {
        if (data.length === 0 ){
            res.status(404);
            return Promise.reject("404 No giggers found");
        }
        res.status(200)
        .json({
            status: 'Success!!',
            data: data,
            message: 'Retrieved all the giggers in the database'
        });
    })
    .catch(function (err) {
        return next(err);
    })
}

//lets get all the gigs/employers
function getallgigs(req, res, next) {
    var typearr = ['employer']
    db.any('SELECT * FROM giggers WHERE type IN ($1)', typearr)
    .then(function (data) {
        if (data.length === 0 ){
            res.status(404);
            return Promise.reject("404 No gigs found");
        }
        res.status(200)
        .json({
            status: 'Success!!',
            data: data,
            message: 'Retrieved all the available gigs in the database'
        });
    })
    .catch(function (err) {
        return next(err);
    })
}

// //lets get just one employer(gig)
// function getonegig(req, res, next) {
//     var gigID = parseInt(req.params.id);
//     var typearr = ['employer'];
//     db.one('SELECT * FROM giggers WHERE id = $1, type IN($2)', giggerID, typearr)
//     .then(function (data) {
//         if(data.length === 0 ){
//             res.status(404)
//             return Promise.reject("404 Nothing found");
//         }
//         res.status(200)
//         .json({
//             status: 'Success!!',
//             data: data,
//             message: 'Retrieve ONE gig available from database'
//         });
//     })
//     .catch(function (err) {
//         return next(err);
//     });
//  }

function getonegigger(req, res, next) {
    var giggerID = parseInt(req.params.id);
    db.one('SELECT * FROM giggers WHERE id = $1', giggerID)
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
 }

function updategigger(req, res, next) { 
    //i should attempt to make sure that id exists here

    db.none('UPDATE GIGGERS set type=$1, name=$2, username=$3, speciality=$4, description=$5',
    [req.body.type, req.body.name, req.body.username, 
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
}

function removegigger(req, res, next) { 
    var giggerID = parseInt(req.params.id);
    db.result('DELETE FROM giggers where id = $1', giggerID)
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
}

module.exports = {
    getallgiggers: getallgiggers,
    getonegigger: getonegigger,
    getallgigs: getallgigs,
    creategigger: creategigger,
    updategigger: updategigger,
    removegigger: removegigger
};

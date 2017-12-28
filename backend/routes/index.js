var express = require('express');
var db = require('../queries');
var cors = require('cors');

const pg = require('pg');
const path = require('path');
const dbconnection = process.env.DATABASE_URL || 'postgres://localhost:5432/giggersdb';


const router = express.Router();
 router.get('/', function(req,res) {
    res.json({message: 'Let the games begin!'});
 });

// router.get('/', (req, res) => {
//     res.send('api works');
// })

router.use(cors());

router.get('/giggers', db.getallgiggers);
router.get('/giggers/:id', db.getonegigger);
router.get('/gigs', db.getallgigs);
// router.get('/gigs/:id', db.getonegig);
router.post('/giggers', db.creategigger);
router.put('/giggers/:id', db.updategigger);
router.delete('/giggers/:id', db.removegigger);

module.exports = router;


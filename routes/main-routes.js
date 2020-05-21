const express = require('express');
const fs = require('fs');

const router = express.Router();

const data = [];

router.get('/', (req,res,next) => {
    res.render('index', { notes: data });
});

router.use('/remove/:id', (req,res,next)=>{
    const id = req.params.id;
    const index = data.findIndex(d => d.id == id);
    data.splice(index,1);
    fs.writeFile('notes.json', JSON.stringify(data, null, 2), ()=> {
        res.status(302).redirect('/');
    });
});

router.post('/note', (req,res,next) => {
    data.push({
        id: Math.random(),
        note: req.body.note,
        done: false
    });
    fs.writeFile('notes.json', JSON.stringify(data, null, 2), ()=> {
        res.status(302).redirect('/');
    });
});

module.exports = router;
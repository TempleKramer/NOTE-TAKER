const router = require('express').Router()
const save = require('../db/save')


router.get('/notes', (req, res) => {
    save.getNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => {
        res.status(500).json(err)
    })
})

router.post('/notes', (req, res) => {
    //Destructuring assignment for the items in req.body
    const { title, text } = req.body
    // If all the required properties are present
    if (title && text) {
        const newNotes = 
        {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
        };

        readFromFile('./db/db.json').then ((data) => res.json(JSON.parse(data)))

        res.json(response);
    } else {
        res.json('Error in posting notes');
    }
});


// router.get('/notes', (req, res) => {
//     save.getNotes().then((notes) => {
//         return res.json(notes)
//     }).catch((err) => {
//         res.status(500).json(err)
//     })
// })


// router.get('/notes', (req, res) => {
//     save.getNotes().then((notes) => {
//         return res.json(notes)
//     }).catch((err) => {
//         res.status(500).json(err)
//     })
// })

module.exports = router
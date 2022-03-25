const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

// init app and middleware
const app = express();
app.use(express.json());

// db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

// routes
app.get('/', (req, res) => {
    let decks = []

    const page = req.query.p || 0
    const decksPerPage = 3
    console.log(page, decksPerPage)

    db.collection('publicDecks')
        .find() //cursor
        .sort({ author: 1 })
        .skip(page * decksPerPage)
        .limit(decksPerPage)
        .forEach(deck => decks.push(deck))
        .then(() => {
            res.status(200).json(decks)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch decks'})
        })
})

app.get('/publicDecks/:id', (req, res) => {

    //check for valid format in URL
    if (ObjectId.isValid(req.params.id)) {
        db.collection('publicDecks')
            .findOne({_id: ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({error: 'could not fetch document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid ID number'})
    }
})

app.post('/', (req,res) => {
    const deck = req.body

    db.collection('publicDecks')
        .insertOne(deck)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new document'})
        })
})

app.delete('/:id', (req,res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('publicDecks')
            .deleteOne({_id: ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not delete document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid ID number'})
    }
})


app.patch('/:id', (req, res) => {
    const update = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('publicDecks')
            .updateOne({_id: ObjectId(req.params.id)}, {$set: update})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update document'})
            })
    } else {
        res.status(500).json({error: 'Not a valid ID number'})
    }
})

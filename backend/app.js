const express = require('express')
const { connectToDb, getDb } = require('./db')

// init app and middleware
const app = express()

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

    db.collection('publicDecks')
        .find() //cursor
        .sort({ author: 1 })
        .forEach(deck => decks.push(deck))
        .then(() => {
            res.status(200).json(decks)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch decks'})
        })
})

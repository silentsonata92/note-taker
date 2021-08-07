
const express = require('express')
const app = express() 
const { join } = require('path')
const { uid } = require('uid')
let notes = require('./db/db.json')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




//html routes

app.get('/', (req, res) =>{
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

app.get('/notes', (req, res) =>{
  res.sendFile(join(__dirname, 'public', 'notes.html'))
})

//notes CRUD routes

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', (req,res) => {
  const note = {
    id: uid(),
    ... req.body
  }
  notes.push(note)
  res.json(notes)

})

app.put('/api/notes/:id', (req, res) => {
  notes = notes.map(note => {
    if (note.id === req.params.id) {
      note.body = req.body.body
    }
    return note
  })
  res.json(notes)
})

app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
  res.json(notes)
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`server running`);
})





let addNew = document.getElementById('addNew')
let noteTitle = document.getElementById('h5')
let noteBody = document.getElementById('body')
let list = document.getElementById('list')


function retrieve () {
  axios.get('/api/notes')
    .then(({ data: notes }) => {
      showNotes(notes)
    })
    .catch(err => console.log(err))
}

function showNotes (notes) {
  list.innerHTML = ''
  notes.forEach(note => {
    let noteElem = document.createElement('li')
    noteElem.innerHTML = `
            <h5>${note.title}</h5>
            <form>
            <input type="text" value="${note.body}">
            <button class="update btn btn-primary" data-id="${note.id}">Update</button>
            </form>
            <button class="delete btn btn-danger" data-id="${note.id}">x</button>
          `
    list.append(noteElem)
  })
}

document.addEventListener('click', event => {
  if (event.target.classList.contains('update')) {
    event.preventDefault()
    let body = event.target.previousElementSibling.value
    let id = event.target.dataset.id
    axios.put(`/api/notes/${id}`, { body })
      .then(({ data: notes }) => showNotes(notes))
      .catch(err => console.log(err))
  } else if (event.target.classList.contains('delete')) {
    let id = event.target.dataset.id
    axios.delete(`/api/notes/${id}`)
      .then(({ data: notes }) => showNotes(notes))
      .catch(err => console.log(err))
  }
})



addNew.addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/notes', {
    title: noteTitle.value,
    body: noteBody.value
  })
    .then(({ data: notes }) => {
      showNotes(notes)
      noteTitle.value = ''
      noteBody.value = ''
    })
})

retrieve()


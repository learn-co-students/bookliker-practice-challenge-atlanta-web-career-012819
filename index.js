const BOOKS_URL = 'http://localhost:3000/books'

document.addEventListener("DOMContentLoaded", () => {
  renderAllBooks()
}
);

function renderAllBooks() {
  fetch(BOOKS_URL)
    .then(res => res.json())
    .then(data => data.forEach(book => renderBook(book)))
}

function renderBook(book) {
  const list = document.getElementById('list')
  const li = document.createElement('li')
  li.textContent = book.title
  li.id = book.id
  list.append(li)
  li.addEventListener('click', getBookById)
}

function getBookById(e) {
  return fetch(BOOKS_URL + `/${e.target.id}`)
  .then(res => res.json())
  .then(book => renderBookDetails(book))
}

function renderBookDetails(book) {
  const detailsPane = document.getElementById('show-panel')
  detailsPane.innerHTML = ''
  
  const title = document.createElement('h3')
  title.textContent = book.title
  detailsPane.append(title)

  const image = document.createElement('img')
  image.src = book.img_url
  detailsPane.append(image)

  const desc = document.createElement('div')
  desc.textContent = book.description
  detailsPane.append(desc)

  const users = document.createElement('ul')
  book.users.forEach(user => {
    const li = document.createElement('li')
    li.textContent = user.username
    li.dataset.id = user.id
    users.append(li)
  })
  detailsPane.append(users)

  const likeButton = document.createElement('button')
  likeButton.textContent = 'Like Book'
  detailsPane.append(likeButton)
  likeButton.id = book.id
  likeButton.addEventListener('click', likeBook)
}

function likeBook(e) {
  console.log(e.target.id)
  e.preventDefault
  let existingUsers = {"users": []}
  Array.from(e.target.previousSibling.childNodes).forEach(li => {
    existingUsers.users.push({"id": li.dataset.id, "username": li.textContent})
  })
  existingUsers.users.push({"id":1, "username":"pouros"})
  fetch(BOOKS_URL + `/${e.target.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(existingUsers)
  })

}

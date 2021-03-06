let books = []

function goToPage(pageName) {
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.contains(pageName) ? page.classList.add('active') : page.classList.remove('active'))
}

function Book(title='', author='', page_num=0, isRead=false, id, book_cover) {
  this.title = title
  this.author = author
  this.page_num = page_num
  this.book_cover = book_cover
  this.isRead = isRead
  this.id = id || Date.now()
}

Book.prototype.deleteBook = function(id) {
  books = books.filter(book => book.id !== id)
  saveBooks(books)
}

Book.prototype.renderBook = function() {
  const { title, author, page_num, book_cover, isRead, id } = this
  const bookRow = document.createElement("tr")
  // render checkbox
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.value = isRead
  const checkboxCell = document.createElement("td")
  checkboxCell.appendChild(checkbox)
  bookRow.appendChild(checkboxCell)

  // render book cover
  const bookCoverCell = document.createElement("td")
  const bookCoverImage = document.createElement("img")
  if (book_cover) {
    bookCoverImage.src = book_cover
  } else {
    bookCoverImage.classList.add('default')
  }
  bookCoverCell.appendChild(bookCoverImage)
  bookRow.appendChild(bookCoverCell)

  // render book title
  const bookTitleCell = document.createElement("td")
  bookTitleCell.textContent = title
  bookRow.appendChild(bookTitleCell)

  // render author
  const bookAuthorCell = document.createElement("td")
  bookAuthorCell.textContent = author
  bookRow.appendChild(bookAuthorCell)

  // render page number
  const bookPageNumberCell = document.createElement("td")
  bookPageNumberCell.textContent = page_num
  bookRow.appendChild(bookPageNumberCell)

  // render actions column
  const actionsCell = document.createElement("td")
  const deleteButton = document.createElement("button")
  deleteButton.textContent = 'Delete'
  deleteButton.onclick = () => {
    this.deleteBook(id)
    renderBooks()
  }
  actionsCell.appendChild(deleteButton)
  bookRow.appendChild(actionsCell)

  return bookRow
}

function saveBooks(books) {
  localStorage.setItem('books', JSON.stringify(books))
}

function addBook(event) {
  event.preventDefault()
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const page_num = document.querySelector("#page_num").value
  const book_cover = document.querySelector("#book_cover").value
  const newBook = new Book(title, author, page_num, book_cover)
  books.push(newBook)
  saveBooks(books)
  goToPage('home')
  renderBooks()
}

function renderEmptyState() {
  const row = document.createElement("tr")
  const column = document.createElement("td")
  column.colSpan = 6
  column.textContent = 'There are no books yet. Add a book!'
  column.id = 'empty'
  row.appendChild(column)
  return row
}

function renderBooks() {
  const bookDisplay = document.querySelector("tbody")
  const rowsToRemove = bookDisplay.querySelectorAll("tr")
  rowsToRemove.forEach(row => bookDisplay.removeChild(row))
  if (books.length > 0) {
    books.forEach(book => bookDisplay.appendChild(book.renderBook()))
  } else {
    bookDisplay.appendChild(renderEmptyState())
  }
}

function initData() {
  const data = localStorage.getItem('books')
  if (data) {
    const parsedData = JSON.parse(data)
    books = parsedData.map(({title, author, book_cover, isRead, page_num, id}) => new Book(title, author, page_num, isRead, id, book_cover))
  }
}

initData()
renderBooks()

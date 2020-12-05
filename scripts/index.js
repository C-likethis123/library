let books = []

function goToPage(pageName) {
  const pages = document.querySelectorAll(".page")
  pages.forEach((page) => page.classList.contains(pageName) ? page.classList.add('active') : page.classList.remove('active'))
}

function Book(title, author='', page_num=0, book_cover="../assets/open-book.svg") {
  this.title = title
  this.author = author
  this.page_num = page_num
  this.book_cover = book_cover
  this.isRead = false
  this.id = (new Date()).toLocaleString()
}

Book.prototype.deleteBook = function(bookToDelete) {
  books = books.filter(book => book.id !== bookToDelete.id)
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
  bookCoverImage.src = book_cover
  bookCoverCell.appendChild(bookCoverImage)
  bookRow.appendChild(bookCoverCell)

  // render book title
  const bookTitleCell = document.createElement("td")
  bookTitleCell.textContent = title
  bookRow.appendChild(bookTitleCell)
  return bookRow
}

function addBook(event) {
  event.preventDefault()
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const page_num = document.querySelector("#page_num").value
  const book_cover = document.querySelector("#book_cover").value
  const newBook = new Book(title, author, page_num, book_cover)
  books.push(newBook)
  goToPage('home')
  renderBooks()
}

function renderBooks() {
  const bookDisplay = document.querySelector("tbody")
  const rowsToRemove = bookDisplay.querySelectorAll("tr")
  rowsToRemove.forEach(row => bookDisplay.removeChild(row))
  books.forEach(book => bookDisplay.appendChild(book.renderBook()))
}

renderBooks()

// function Storage() {
//   if (!localStorage.books) {
//     localStorage.books = JSON.stringify([])
//   }
//   this.books = JSON.parse(localStorage.books)
// }

// Storage.prototype.saveBook = function(book) {
//   this.books.push(book)
//   localStorage.books = JSON.stringify(this.books)
// }

// Storage.prototype.getBook = function() {
//   return JSON.stringify(localStorage.books)
// }

let books = []

function goToPage(pageName) {
  const pages = document.querySelectorAll(".page")
  console.log(pages)
  pages.forEach((page) => page.classList.contains(pageName) ? page.classList.add('active') :page.classList.remove('active'))
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

function addBook(event) {
  event.preventDefault()
  const title = document.querySelector("#title").value
  const author = document.querySelector("#author").value
  const page_num = document.querySelector("#page_num").value
  const book_cover = document.querySelector("#book_cover").value
  const newBook = new Book(title, author, page_num, book_cover)
  books.push(newBook)
  goToPage('home')
}

function initBooks() {
  const bookDisplay = document.querySelector("tbody")
  books.forEach(book => {
    const bookRow = document.createElement("tr")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.value = book.isRead
    const checkboxCell = document.createElement("td")
    checkboxCell.appendChild(checkbox)
    bookRow.appendChild(checkboxCell)

    const bookCoverCell = document.createElement("td")
    const book_cover = document.createElement("img")
    book_cover.src = book.book_cover
    bookCoverCell.appendChild(book_cover)
    bookRow.appendChild(bookCoverCell)
    bookDisplay.appendChild(bookRow)
  })
}

initBooks()

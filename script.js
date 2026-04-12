const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor ");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const container = document.querySelector(".container");

let i;
let j = 0;

function showBook() {
  for (i = j; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    container.appendChild(bookCard);

    const bookTitle = document.createElement("p");
    bookTitle.classList.add("title");
    bookTitle.textContent = `Title :${myLibrary[i].title}`;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.textContent = `Author :${myLibrary[i].author}`;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.classList.add("pages");
    bookPages.textContent = `Number of Pages :${myLibrary[i].pages}`;
    bookCard.appendChild(bookPages);

    const bookRead = document.createElement("p");
    bookRead.classList.add("read");

    if (myLibrary[i].read === true) {
      bookRead.textContent = "Already Read";
      bookRead.style.color = "skyblue";
    }

    if (myLibrary[i].read === false) {
      bookRead.textContent = "Not Read yet";
      bookRead.style.color = "pink";
    }
    bookCard.appendChild(bookRead);

    const removeBook = document.createElement("button");
    removeBook.classList.add("remove_book");
    removeBook.textContent = "Remove book \u{1F5D1}";
    bookCard.appendChild(removeBook);

    const readStatus = document.createElement("button");
    readStatus.id = "for_read_status";
    readStatus.textContent = myLibrary[i].read === false ? "Read" : "Not Read";

    readStatus.style.backgroundColor = "white";
    bookCard.appendChild(readStatus);

    let index = i;

    function changeReadStatus() {
      if (myLibrary.length >= 1) {
        index = 0;
      }

      myLibrary[index].toggleRead();

      if (myLibrary[index].read === true) {
        bookRead.textContent = "Already Read";
        bookRead.style.color = "skyblue";
        readStatus.textContent = "Not Read";
        readStatus.style.backgroundColor = "pink";
      }

      if (myLibrary[index].read === false) {
        bookRead.textContent = "Not Read yet";
        bookRead.style.color = "pink";
        readStatus.textContent = "Read";
        readStatus.style.backgroundColor = "white";
      }
    }

    readStatus.addEventListener("click", () => {
      changeReadStatus();
    });

    // bookCard.dataset.id = myLibrary[i].id;
    bookCard.dataset.id = myLibrary[i].id;
    let uuid = bookCard.dataset.id;

    removeBook.addEventListener("click", () => {
      const indexOfBook = myLibrary.findIndex((book) => book.id === uuid);

      myLibrary.splice(indexOfBook, 1);

      bookCard.remove();
    });
  }
}

const form = document.querySelector("form");
const addBook = document.querySelector(".addBook");

const dialogBox = document.querySelector("dialog");

addBook.addEventListener("click", () => {
  dialogBox.showModal();
});

const submitButton = document.querySelector(".submit");

const formClose = document.querySelector("#form_close");

formClose.addEventListener("click", () => {
  dialogBox.close("cancel");

  form.reset();
});

let addedBook;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  userAddedBooks();

  showBook();
});

function userAddedBooks() {
  addedBook = new FormData(event.target);

  dialogBox.close();

  let addedBookTitle = addedBook.get("book_title");
  let addedBookAuthor = addedBook.get("book_author");
  let addedBookPages = addedBook.get("book_pages");
  let addedBookRead;

  if (addedBook.get("read_status").toLowerCase() === "yes") {
    addedBookRead = true;
  }

  if (addedBook.get("read_status").toLowerCase() === "no") {
    addedBookRead = false;
  }

  j = myLibrary.length;
  addBookToLibrary(
    addedBookTitle,
    addedBookAuthor,
    addedBookPages,
    addedBookRead,
  );

  form.reset();
}
addBookToLibrary("Vinland Saga", "Makoto Yukimura", 464, false);
addBookToLibrary("Who Goes There?", "John W. Campbell", 168, true);
addBookToLibrary("Think Like a Programmer", "V.Anton Spraul", 256, false);

showBook();

function removeBookFromLibrary() {
  let uuid = bookCard.dataset.id;
  myLibrary.filter((books) => (books.id = uuid));
}

// thank you

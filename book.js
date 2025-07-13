function Book(title, author, pages, read, uuid) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = uuid;
    this.info = function () {
        return `The ${this.title} is a book written by ${this.author}. It has ${this.pages} pages and you have ${this.read ? 'already' : 'not'} read it.`;
    };
}

const myBooks = [new Book("Teller", "Dummy", 124, true, 1)];

function addBookToMyBooks(title, author, pages, read) {
    let uuid = crypto.randomUUID();
    let newBook = new Book(title, author, pages, read, uuid);
    myBooks.push(newBook);
}

function removeBook(uuid) {
    let index = myBooks.findIndex((book) => book.uuid == uuid);
    if (index != -1)
        myBooks.splice(index, 1);
}

function markRead(uuid, read) {
    let index = myBooks.findIndex((book) => book.uuid == uuid)
    if (index != -1) {
        myBooks[index].read = !myBooks[index].read; 
        return myBooks[index].read
    }
    return false
}

export { Book, addBookToMyBooks, removeBook, myBooks, markRead };
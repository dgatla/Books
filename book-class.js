class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.uuid = crypto.randomUUID();
    }

    info() {
        return `The ${this.title} is a book written by ${this.author}. It has ${this.pages} pages and you have ${this.read ? 'already' : 'not'} read it.`;
    }
}

class Library {
    constructor() {
        this.myBooks = []
    }

    addBookToMyBooks(title, author, pages, read) {
        let newBook = new Book(title, author, pages, read);
        this.myBooks.push(newBook);
        return newBook
    }

    removeBook(uuid) {
        let index = this.myBooks.findIndex((book) => book.uuid == uuid);
        if (index != -1)
            this.myBooks.splice(index, 1);
    }

    markRead(uuid, read) {
        let index = this.myBooks.findIndex((book) => book.uuid == uuid)
        if (index != -1) {
            this.myBooks[index].read = !this.myBooks[index].read;
            return this.myBooks[index].read
        }
        return false
    }
}

export { Library }
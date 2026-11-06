export class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isRead = false;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}

export class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    toggleBookStatus(index) {
        this.books[index].toggleRead();
    }
}
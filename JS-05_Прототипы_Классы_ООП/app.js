import { Book, Library } from './book.js';
import { UI } from './ui.js';

const myLibrary = new Library();

const ui = new UI(myLibrary, {
    onAdd: (title, author) => {
        const newBook = new Book(title, author);
        myLibrary.addBook(newBook);
        ui.render();
    },
    onDelete: (index) => {
        myLibrary.removeBook(index);
        ui.render();
    },
    onToggle: (index) => {
        myLibrary.toggleBookStatus(index);
        ui.render();
    }
});

myLibrary.addBook(new Book("Преступление и наказание", "Ф. Достоевский"));
ui.render();
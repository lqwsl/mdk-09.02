export class UI {
    constructor(library, callbacks) {
        this.library = library;
        this.callbacks = callbacks;

        this.form = document.getElementById('book-form');
        this.titleInput = document.getElementById('title-input');
        this.authorInput = document.getElementById('author-input');
        this.listContainer = document.getElementById('book-list');

        this.initListeners();
    }

    initListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = this.titleInput.value;
            const author = this.authorInput.value;

            this.callbacks.onAdd(title, author);
            this.form.reset();
        });

        this.listContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const index = e.target.dataset.index;
                const action = e.target.dataset.action;

                if (action === 'delete') {
                    this.callbacks.onDelete(index);
                } else if (action === 'toggle') {
                    this.callbacks.onToggle(index);
                }
            }
        });
    }

    render() {
        this.listContainer.innerHTML = '';

        this.library.books.forEach((book, index) => {
            const item = document.createElement('div');
            item.style.margin = '10px 0';
            
            const style = book.isRead ? 'text-decoration: line-through; color: gray;' : '';

            item.innerHTML = `
                <span style="${style}">${book.title} — ${book.author}</span>
                <button data-action="toggle" data-index="${index}">V</button>
                <button data-action="delete" class="btn-delete" data-index="${index}">X</button>
            `;
            this.listContainer.appendChild(item);
        });
    }
}
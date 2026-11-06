export class UI {
    constructor(manager, onAdd, onDelete) {
        this.manager = manager;
        this.form = document.getElementById("form");
        this.titleInput = document.getElementById("title");
        this.textInput = document.getElementById("text");
        this.errorDiv = document.getElementById("error");
        this.list = document.getElementById("list");

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.errorDiv.textContent = "";
            try {
                onAdd(this.titleInput.value, this.textInput.value);
                this.form.reset();
            } catch (err) {
                this.errorDiv.textContent = err.message;
            }
        });

        this.list.addEventListener("click", (e) => {
            const button = e.target.closest("button");
    
            if (button && button.dataset.action === "delete") {
            const index = Number(button.dataset.index);
            onDelete(index);
    }
});
    }

    render() {
        this.list.innerHTML = "";
        this.manager.notes.forEach((note, index) => {
            const div = document.createElement("div");
            div.className = "note-item";

            const content = document.createElement("div");
            
            const h = document.createElement("strong");
            h.textContent = note.title;
            
            const p = document.createElement("p");
            p.textContent = note.text;

            content.append(h, p);

            const btn = document.createElement("button");
            btn.textContent = "Удалить";
            btn.className = "btn-delete";
            btn.dataset.action = "delete";
            btn.dataset.index = index;

            div.append(content, btn);
            this.list.append(div);
        });
    }
}
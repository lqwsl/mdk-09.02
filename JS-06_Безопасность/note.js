export class NoteManager {
    constructor() {
        this.notes = this.load();
    }

    load() {
        try {
            const data = localStorage.getItem("notes");
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    save() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
    }

    add(title, text) {
        if (!title.trim() || !text.trim()) {
            throw new Error("Заполните все поля!");
        }
        this.notes.push({ title: title.trim(), text: text.trim() });
        this.save();
    }

    remove(index) {
        this.notes.splice(index, 1);
        this.save();
    }
}
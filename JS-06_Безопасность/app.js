import { NoteManager } from "./note.js";
import { UI } from "./ui.js";

const manager = new NoteManager();

const ui = new UI(
    manager,
    (title, text) => {
        manager.add(title, text);
        ui.render();
    },
    (index) => {
        manager.remove(index);
        ui.render();
    }
);

ui.render();
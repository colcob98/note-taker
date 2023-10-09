const util = require("util");
const fs = require("fs");
const generateId = require("../helpers/uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
        let parsedNotes;
        try {
            parsedNotes = [].concat(JSON.parse(notes));
        } catch (err) {
            parsedNotes = [];
        }
        return parsedNotes;
    })
  }

  saveNote(note) {
    note.id = generateId();
    return this.getNotes()
      .then((notes) => {
        notes.push(note);
        return notes;
      })
      .then((notes) => {
        return this.write(notes);
      })
      .then(() => {
        return note;
      });
  }
  eraseNote(id) {
    return this.getNotes()
      .then((notes) => {
        return notes.filter((note) => note.id !== id);
      })
      .then((notes) => {
        return this.write(notes);
      });
  }
}

module.exports = Notes;

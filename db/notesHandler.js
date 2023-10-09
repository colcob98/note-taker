const util = require('util');
const fs = require('fs');
const generateId = require('../helpers/uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync = util.promisify('db/db.json', JSON.stringify(note));
    }

    getNotes(){
        return this.read().then((notes) => {
            return JSON.parse(notes) || [];
        });
    }

    addNote(){
        note.id = generateId();
        return this.getNotes().then(notes => {
            notes.push(note);
            return notes;
        })
        .then(notes => {
            return this.write(JSON.stringify(notes));
        })
        .then(() => {
            return note;
        });
    }

    eraseNote(){

    }
}

module.exports = Notes;
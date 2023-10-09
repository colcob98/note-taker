const router = require("express").Router();
const Notes = require("../db/notesHandler");
const notes = new Notes();

router.get("/notes", (req, res) => {
  notes
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

router.post("/notes", (req, res) => {
  notes
    .saveNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

router.delete("/notes/:id", (req, res) => {
  notes
    .eraseNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

module.exports = router;

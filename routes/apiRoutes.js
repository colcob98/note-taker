const router = require("express").Router();
const store = require("../db/notesHandler");

router.get("/notepad", (req, res) => {
  notes
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

router.post("/notepad", (req, res) => {
  notes
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

router.delete("/notepad/:id", (req, res) => {
  notes
    .eraseNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err).send("Internal Server Error"));
});

module.exports = router;
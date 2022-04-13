const express = require("express");
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const router = express.Router();

//POST call for creating new notes
router.post(
  "/addNotes",
  fetchuser,
  [
    body("description").isLength({ min: 5 }),
    body("title").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are erros, retur bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.user.id;
        const {title, description, tag} = req.body;
        const note = new Note({
            title, description, tag, user: userId
        });
        const saveNotes = await note.save();
        res.send(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//GET call for fetching user notes
router.get(
    "/getNotes",
    fetchuser,
    async (req, res) => {
      try {
          const userId = req.user.id;
          const notes = await Notes.find({user: userId});
          res.send(notes);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );

//PUT call for updating user notes
router.put(
    "/updateNotes/:id",
    fetchuser,
    async (req, res) => {
      try {
          const {title, description, tag} = req.body;
          let note = await Notes.findById(req.params.id);
          if(!note){
            return res.status(400).send("not found!");
          }
          if(note.user.toString() !== req.user.id){
              return res.status(401).send("not allowed!");
          }
          const newNote = {};
          if(title){newNote.title = title};
          if(description){newNote.description = description};
          if(tag){newNote.tag = tag};
          note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
          res.send(note);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );

//DELETE call for deleting user notes
router.delete(
    "/deleteNotes/:id",
    fetchuser,
    async (req, res) => {
      try {
          let note = await Notes.findById(req.params.id);
          if(!note){
            return res.status(400).send("not found!");
          }
          if(note.user.toString() !== req.user.id){
              return res.status(401).send("not allowed!");
          }
          note = await Notes.findByIdAndDelete(req.params.id);
          res.send({message: "success", note: note});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );

module.exports = router;

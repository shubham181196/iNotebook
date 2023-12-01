const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// ROUTE 1:Get all notes GET "/api/auth/getuser" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Some error occured" });
  }
});

// ROUTE 2:Add a new Note using :POST "/api/auth/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be atleast 5 character long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Some error occured" });
    }
  }
);

// ROUTE 3:Update an existing Note using :POST "/api/auth/updatenote" login required
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const newNote ={};
        if(title) {newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag}; 
        // find note to be updated
        let note=await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send("Not found");
        }
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not allowed");
        }
        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Some error occured" });
      }
    }
  );


  // ROUTE 4:Delete an existing Note using :DELETE "/api/auth/deletenote" login required
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        // find note to be updated
        let note=await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send("Not found");
        }
        if(note.user.toString()!=req.user.id){
            return res.status(401).send("Not allowed");
        }
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({message:"note deleted successfully"});
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Some error occured" });
      }
    }
  );
module.exports = router;

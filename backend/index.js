const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);
const cors = require("cors")

const Note = require("./models/note.model");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors())

app.post("/cards", async (req, res) => {
    const { title, content } = req.body;
  
    if (!title) {
      return res.status(400).json({ error: true, message: "Please enter title" });
    }
    if (!content) {
      return res
        .status(400)
        .json({ error: true, message: "Please enter content" });
    }
    try {
      const note = new Note({
        title,
        content,
      });
      await note.save();
      return res.json({ error: false, message: "Note added successfully", note });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: `Something went wrong ${error}` });
    }
  });


  app.get("/cards", async (req, res) => {
    try {
      const cards = await Note.find().sort({ createdAt: -1 });
      return res.json({ error: false, cards, message: "Cards fetched successfully" });
    } catch (error) {
      return res.status(500).json({ error: true, message: `Something went wrong: ${error.message}` });
    }
  });

  app.get("/cards/:title", async (req, res) => {
    const { title } = req.params;
    try {
      const card = await Note.findOne({ title });
      if (!card) {
        return res.status(404).json({ error: true, message: "Card not found" });
      }
      return res.json({ error: false, card, message: "Card fetched successfully" });
    } catch (error) {
      return res.status(500).json({ error: true, message: `Something went wrong: ${error.message}` });
    }
  });


  app.listen(4000, () => console.log("Server started on port 3000"));
  module.exports = app;

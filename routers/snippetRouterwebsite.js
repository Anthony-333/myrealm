const router = require("express").Router();
const Snippetwebsite = require("../models/snippetModel-website");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const snippets = await Snippetwebsite.find({ user: req.user });
    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body;

    // validation

    if (!description && !code) {
      return res.status(400).json({
        errorMessage: "Please Enter description or code.",
      });
    }

    const newSnippet = new Snippetwebsite({
      title,
      description,
      code,
      user: req.user,
    });

    const savedSnippet = await newSnippet.save();

    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, code } = req.body;
    const snippetId = req.params.id;

    // validation

    if (!description && !code) {
      return res.status(400).json({
        errorMessage: "Please Enter description or code.",
      });
    }

    if (!snippetId)
      return res.status(400).json({
        errorMessage: "Item ID not given. Please contact the developer.",
      });

    const originalSnippet = await Snippetwebsite.findById(snippetId);
    if (!originalSnippet)
      return res.status(400).json({
        errorMessage:
          "No item with this ID was found. Please contact the developer.",
      });

    if (originalSnippet.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    originalSnippet.title = title;
    originalSnippet.description = description;
    originalSnippet.code = code;

    const savedSnippet = await originalSnippet.save();

    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const snippetId = req.params.id;

    // validation

    if (!snippetId)
      return res.status(400).json({
        errorMessage: "Item ID not given. Please contact the developer.",
      });

    const existingSnippet = await Snippetwebsite.findById(snippetId);
    if (!existingSnippet)
      return res.status(400).json({
        errorMessage:
          "No item with this ID was found. Please contact the developer.",
      });

    if (existingSnippet.user.toString() !== req.user)
      return res.status(401).json({ errorMessage: "Unauthorized." });

    await existingSnippet.delete();

    res.json(existingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;

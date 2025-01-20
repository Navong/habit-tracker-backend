const express = require("express");
const { getEntries, addEntry, updateEntry, deleteEntry, saveJournalReflection } = require("../controllers/journalController");

const router = express.Router();

router.get("/", getEntries);
router.post("/", addEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

// New route for saving a reflection
router.put("/:id/reflection", saveJournalReflection);

module.exports = router;

const express = require("express");
const { getHabits, createHabit, updateHabit, deleteHabit, toggleHabitCompletion } = require("../controllers/habitController");

const router = express.Router();

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);


// New route for toggling habit completion
router.put("/:id/toggle", toggleHabitCompletion);

module.exports = router;

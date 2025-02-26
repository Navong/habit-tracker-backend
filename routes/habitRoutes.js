const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const habits = await prisma.habit.findMany();
        console.log(habits);
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: "Error fetching habits" });
    }
});

router.post("/", async (req, res) => {
    const { name, description, goal, frequency, color, category } = req.body;
    try {
        const newHabit = await prisma.habit.create({
            data: { name, description, goal, frequency, color, category, completedDates: [] },
        });
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHabit = await prisma.habit.delete({ where: { id } });
        res.json(deletedHabit);
    } catch (error) {
        res.status(500).json({ error: "Error deleting habit" });
    }
});

router.put("/:id/toggle", async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    try {
        const habit = await prisma.habit.findUnique({
            where: { id },
        });

        if (!habit) {
            return res.status(404).json({ error: "Habit not found" });
        }

        let updatedCompletedDates;

        // Check if the date is already in completedDates
        if (habit.completedDates.includes(date)) {
            updatedCompletedDates = habit.completedDates.filter((d) => d !== date);
        } else {
            updatedCompletedDates = [...habit.completedDates, date];
        }

        const updatedHabit = await prisma.habit.update({
            where: { id },
            data: {
                completedDates: updatedCompletedDates,
            },
        });

        console.log("Updated Habit:", updatedHabit);

        res.json(updatedHabit);
    } catch (error) {
        console.error("Error toggling habit completion:", error);
        res.status(500).json({ error: "Error toggling habit completion" });
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, goal, frequency, color, category } = req.body;
    try {
        const updatedHabit = await prisma.habit.update({
            where: { id },
            data: { name, description, goal, frequency, color, category },
        });
        res.json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: "Error updating habit" });
    }
});

router.delete("/api/habits/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.habit.delete({ where: { id } });
        res.json({ message: "Habit deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting habit" });
    }
});


module.exports = router;

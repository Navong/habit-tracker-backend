const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const habits = await prisma.habit.findMany();
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
        res.status(500).json({ error: "Error adding habit" });
    }
});

module.exports = router;

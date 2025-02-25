const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const entries = await prisma.journalEntry.findMany();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entries" });
    }
});

router.post("/", async (req, res) => {
    const { date, content, mood } = req.body;
    try {
        const newEntry = await prisma.journalEntry.create({
            data: { date: new Date(date), content, mood },
        });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ error: "Error adding journal entry" });
    }
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Journal Routes
app.get("/api/journals", async (req, res) => {
    try {
        const entries = await prisma.journalEntry.findMany();
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error fetching journal entries" });
    }
});

app.post("/api/journals", async (req, res) => {
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

app.put("/api/journals/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedEntry = await prisma.journalEntry.update({ where: { id }, data });
        res.json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error: "Error updating journal entry" });
    }
});

app.delete("/api/journals/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.journalEntry.delete({ where: { id } });
        res.json({ message: "Journal entry deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting journal entry" });
    }
});

// Habit Routes
app.get("/api/habits", async (req, res) => {
    try {
        const habits = await prisma.habit.findMany();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: "Error fetching habits" });
    }
});

app.post("/api/habits", async (req, res) => {
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

app.put("/api/habits/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedHabit = await prisma.habit.update({ where: { id }, data });
        res.json(updatedHabit);
    } catch (error) {
        res.status(500).json({ error: "Error updating habit" });
    }
});

app.delete("/api/habits/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.habit.delete({ where: { id } });
        res.json({ message: "Habit deleted" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting habit" });
    }
});

app.put("/api/habits/:id/toggle", async (req, res) => {
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
  
      res.json(updatedHabit);
    } catch (error) {
      console.error("Error toggling habit completion:", error);
      res.status(500).json({ error: "Error toggling habit completion" });
    } 
})

app.get("/", (req, res) => {
    res.send("Welcome to the Habit & Journal Tracker API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

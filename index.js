const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const habitRoutes = require("./src/routes/habitRoutes");
const journalRoutes = require("./src/routes/journalRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/habits", habitRoutes);
app.use("/api/journals", journalRoutes);

// Habit Route

app.get("/api/habits", async (req, res) => {
    try {
        const habits = await prisma.habit.findMany();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: "Error fetching habits" });
    }
})

app.post("/api/habits", async (req, res) => {
    const { name, description, goal, frequency, color, category } = req.body;
    try {
        const newHabit = await prisma.habit.create({
            data: { name, description, goal, frequency, color, completedDates: [], category },
        });
        console.log(newHabit);
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({ error: "Error creating habit" });
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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


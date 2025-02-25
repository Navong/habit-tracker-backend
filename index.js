const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Middleware
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);
app.use(express.json());

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Journal Routes
app.get("/api/journals", async (req, res) => {
    const { data, error } = await supabase.from("journal_entries").select("*");
    if (error)
        return res.status(500).json({ error: "Error fetching journal entries" });
    res.json(data);
});

app.post("/api/journals", async (req, res) => {
    const { date, content, mood } = req.body;
    const { data, error } = await supabase
        .from("journal_entries")
        .insert([{ date, content, mood }]);
    if (error)
        return res.status(500).json({ error: "Error adding journal entry" });
    res.status(201).json(data);
});

app.put("/api/journals/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("journal_entries")
        .update(req.body)
        .eq("id", id);
    if (error)
        return res.status(500).json({ error: "Error updating journal entry" });
    res.json(data);
});

app.delete("/api/journals/:id", async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id);
    if (error)
        return res.status(500).json({ error: "Error deleting journal entry" });
    res.json({ message: "Journal entry deleted" });
});

// Habit Routes
app.get("/api/habits", async (req, res) => {
    const { data, error } = await supabase.from("habits").select("*");
    console.log(data);
    if (error) return res.status(500).json({ error: "Error fetching habits" });
    res.json(data);
});

app.post("/api/habits", async (req, res) => {
    const { name, description, goal, frequency, color, category, completed_dates } = req.body;

    console.log(req.body)

    const { data, error } = await supabase
        .from("habits")
        .insert([{ name, description, goal, frequency, color, category, completed_dates }]);
    if (error) return res.status(500).json({ error });
    console.log(error)
    res.status(201).json(data);
});

app.put("/api/habits/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("habits")
        .update(req.body)
        .eq("id", id);
    if (error) return res.status(500).json({ error: "Error updating habit" });
    res.json(data);
});

app.delete("/api/habits/:id", async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from("habits")
        .delete()
        .eq("id", id);
    if (error) return res.status(500).json({ error: "Error deleting habit" });
    res.json({ message: "Habit deleted" });
});

app.put("/api/habits/:id/toggle", async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    const { data: habit, error } = await supabase
        .from("habits")
        .select("completed_dates")
        .eq("id", id)
        .single();
    if (error || !habit)
        return res.status(404).json({ error: "Habit not found" });

    let updatedCompletedDates = habit.completed_dates.includes(date)
        ? habit.completed_dates.filter((d) => d !== date)
        : [...habit.completed_dates, date];

    const { error: updateError } = await supabase
        .from("habits")
        .update({ completed_dates: updatedCompletedDates })
        .eq("id", id);
    if (updateError)
        return res.status(500).json({ error: "Error toggling habit completion" });

    res.json({ message: "Habit completion toggled" });
});

app.get("/", (req, res) => {
    res.send("Welcome to the Habit & Journal Tracker API");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

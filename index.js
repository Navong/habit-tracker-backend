const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const journalRoutes = require("./routes/journalRoutes");
const habitRoutes = require("./routes/habitRoutes");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Load Swagger JSON
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "config/swagger.json"), "utf8"));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/journals", journalRoutes);
app.use("/api/habits", habitRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the Habit & Journal Tracker API");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});

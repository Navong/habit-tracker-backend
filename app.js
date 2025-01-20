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



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


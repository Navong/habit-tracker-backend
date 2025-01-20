const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all journal entries
exports.getEntries = async (req, res) => {
    try {
        const entries = await prisma.journalEntry.findMany();
        res.json(entries);
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        res.status(500).json({ error: "Error fetching journal entries" });
    }
};

// Add a new journal entry
exports.addEntry = async (req, res) => {
    const { date, content, mood } = req.body;

    try {
        const newEntry = await prisma.journalEntry.create({
            data: { date, content, mood },
        });
        res.status(201).json(newEntry);
    } catch (error) {
        console.error("Error adding journal entry:", error);
        res.status(500).json({ error: "Error adding journal entry" });
    }
};

// Update a journal entry
exports.updateEntry = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedEntry = await prisma.journalEntry.update({ where: { id }, data });
        res.json(updatedEntry);
    } catch (error) {
        console.error("Error updating journal entry:", error);
        res.status(500).json({ error: "Error updating journal entry" });
    }
};

// Delete a journal entry
exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.journalEntry.delete({ where: { id } });
        res.json({ message: "Journal entry deleted" });
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        res.status(500).json({ error: "Error deleting journal entry" });
    }
};

// Save a journal reflection
exports.saveJournalReflection = async (req, res) => {
    const { id } = req.params;
    const { savedReflection } = req.body;

    try {
        const updatedEntry = await prisma.journalEntry.update({
            where: { id },
            data: { savedReflection },
        });

        res.json({ savedReflection: updatedEntry.savedReflection });
    } catch (error) {
        console.error("Error saving reflection:", error);
        res.status(500).json({ error: "Error saving reflection" });
    }
};

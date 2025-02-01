import express from "express";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();
import knex from "knex";
import config from "../knexfile.js";

const db = knex(config["development"]);

const journalEntriesFile = "./data/journalentries.json";

router.get("/journalentries", async (req, res) => {
  try {
    const items = await db("JournalEntries").select("*");
console.log(items)
 
    res.json(items);

  } catch (error) {
    res.status(500).json({ error: "Database query failed." });
  }

  // fs.readFile(journalEntriesFile, "utf-8", (err, data) => {
  //   if (err) {
  //     return res.status(500).json({ error: "Cannot read journal entries" });
  //   }
  //   const journalEntries = JSON.parse(data || "[]");
  //   res.json(journalEntries);
  // });
});

router.post("/:id", async (req, res) => {
  const { entry } = req.body;

  try {
    const newEntry = await db("JournalEntries").insert({
      id: uuidv4(),
      JournalEntry: entry,
      // TimeStamp: new Date().toISOString().split("T")[0],
      TimeStamp: new Date().toLocaleDateString("en-CA").split("T")[0]
    });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add journal entry" });
  }

  // fs.readFile(journalEntriesFile, "utf-8", (err, data) => {
  //   if (err) {
  //     return res.status(500).json({ error: "Cannot read journal entry." });
  //   //   }
  //     const journalEntries = JSON.parse(data || "[]");
  //     journalEntries.push(newEntry);

  //     fs.writeFile(
  //       journalEntriesFile,
  //       JSON.stringify(journalEntries, null, 2),
  //       (err) => {
  //         if (err) {
  //           return res.status(500).json({ error: "Cannot save journal entry." });
  //         }
  //         res.status(201).json(newEntry);
  //       }
  //     );
  //   });
});

export default router;

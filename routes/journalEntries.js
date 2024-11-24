import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const journalEntriesFile = './data/journalentries.json';

router.get("/", (req,res) => {
    fs.readFile(journalEntriesFile, "utf-8", (err,data)=>{
        if(err){
            return res.status(500).json({error:"Cannot read journal entries"});
        }
     const journalEntries =JSON.parse(data || "[]");
     res.json(journalEntries);
    });
});

router.post("/:id", (req,res)=>{
    const {entry}=req.body;


const newEntry = {
    id: uuidv4(),
    entry,
    timestamp: new Date().toISOString().split("T")[0],
};

fs.readFile(journalEntriesFile, "utf-8", (err,data) => {
if(err){
    return res.status(500).json({error:"Cannot read journal entry."});
}
const journalEntries = JSON.parse(data || "[]");
journalEntries.push(newEntry);


fs.writeFile(journalEntriesFile, JSON.stringify(journalEntries, null, 2), (err) =>{
    if(err){
        return res.status(500).json({error:"Cannot save journal entry."});
    }
    res.status(201).json(newEntry);
});
});
});


export default router;
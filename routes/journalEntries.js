import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

const newEntry ={
    id:uuidv4(), 
    entry
}
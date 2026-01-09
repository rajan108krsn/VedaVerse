import mongoose from "mongoose";
import Temple from "../models/Temple.js";

mongoose.connect("mongodb://127.0.0.1:27017/vedaverse");

const temples = [
  { name: "Kashi Vishwanath", location: "Kashi", images: [] },
  { name: "Somnath", location: "Gujarat", images: [] },
  { name: "Mahakaleshwar", location: "Ujjain", images: [] },
  { name: "Kedarnath", location: "Uttarakhand", images: [] },
  { name: "Badrinath", location: "Uttarakhand", images: [] },
  { name: "Rameshwaram", location: "Tamil Nadu", images: [] },
];

await Temple.insertMany(temples);
console.log("Dummy temples inserted");
process.exit();

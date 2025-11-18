const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Koneksi MongoDB
mongoose.connect("mongodb://localhost:27017/tastemap", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");

// Routes
const foodRoutes = require("./routes/foodRoutes");
app.use("/", foodRoutes);

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

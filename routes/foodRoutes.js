const express = require("express");
const router = express.Router();
const multer = require("multer");
const Food = require("../models/Food");

// Konfigurasi upload foto
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage: storage });

// READ - Home Page
router.get("/", async (req, res) => {
    const foods = await Food.find();
    res.render("index", { foods });
});

// CREATE - tambah makanan
router.post("/add", upload.single("photo"), async (req, res) => {
    const food = new Food({
        name: req.body.name,
        category: req.body.category,
        rating: req.body.rating,
        notes: req.body.notes,
        photo: req.file.filename,
        location: {
            lat: req.body.lat,
            lng: req.body.lng
        }
    });

    await food.save();
    res.redirect("/");
});

// DETAIL
router.get("/detail/:id", async (req, res) => {
    const food = await Food.findById(req.params.id);
    res.render("detail", { food });
});

module.exports = router;

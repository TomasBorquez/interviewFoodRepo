const { Router } = require("express");
const { Recipe } = require("../db");
const router = Router();

// Ability.findAll().then((respuesta) => res.json(respuesta));
router.get("/", (req, res) => {
  res.send("recipe")
});

module.exports = router;
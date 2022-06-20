const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();

// Ability.findAll().then((respuesta) => res.json(respuesta));
router.get("/", (req, res) => {
  res.send("diet")
});

module.exports = router;
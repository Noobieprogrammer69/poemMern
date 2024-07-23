const poemCtrl = require("../controllers/poemCtrl")

const router = require("express").Router()

router.post("/createPoem", poemCtrl.createPoem)
router.get("/getPoems", poemCtrl.getAllPoems)

module.exports = router
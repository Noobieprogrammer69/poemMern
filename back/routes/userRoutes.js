const router = require("express").Router()
const userCtrl = require("../controllers/userCtrl")

router.post("/signup", userCtrl.signUp)
router.post("/login", userCtrl.login)

module.exports = router
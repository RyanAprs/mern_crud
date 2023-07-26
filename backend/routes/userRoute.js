const express = require ("express");
const {loginUser, signupUser } = require ("../controllers/userController");

const router = express.Router();

router.post("/register", signupUser)
router.post("/login", loginUser)

module.exports = router;
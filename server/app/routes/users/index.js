const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("getting users")
})

router.get("/:id", (req, res) => {
    res.send(`getting user by id ${req.params.id}`)
})

module.exports = router;
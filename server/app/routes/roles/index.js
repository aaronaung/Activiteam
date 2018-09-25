const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("getting roles")
})

module.exports = router;
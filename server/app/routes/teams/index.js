const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("getting teams")
})

module.exports = router;
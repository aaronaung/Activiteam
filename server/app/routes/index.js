//Define application parent router
const router = require("express").Router();

router.use("/users", require('./users'));
router.use("/teams", require('./teams'));
router.use("/roles", require('./roles'));

module.exports = router;
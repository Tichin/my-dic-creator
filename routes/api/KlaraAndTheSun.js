const express = require("express");
const fs = require("fs");
const router = express.Router();

// @route    GET api/KlaraAndTheSun/
// @desc
// @access   Private
router.get("/", (req, res) => {
  res.send([]);
});

module.exports = router;

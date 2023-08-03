var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const suggestionsCtrl = require("../controllers/suggestions");

/* GET home page. */
// router.get("/", suggestionsCtrl.index); No need for this because we removed add new button

//New Event Route to display the form
router.get("/", suggestionsCtrl.suggestionForm);

//Creating event Route
router.post("/create", upload.single("image"), suggestionsCtrl.create);

module.exports = router;

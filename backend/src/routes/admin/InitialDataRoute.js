const router = require("express").Router();
const {
  initialData,
} = require("../../controllers/admin/InitialDataController");

router.post("/initialData", initialData);

module.exports = router;

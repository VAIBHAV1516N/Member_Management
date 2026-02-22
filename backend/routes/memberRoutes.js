const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  addMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.use(protect);

router.route("/").post(addMember).get(getMembers);
router.route("/:id").get(getMember).put(updateMember).delete(deleteMember);

module.exports = router;

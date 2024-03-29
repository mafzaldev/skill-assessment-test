const router = require("express").Router();
const todoControllers = require("../controllers/todo-controllers");

router.get("/todos", todoControllers.getTodos);
router.post("/todo", (req, res) => {});
router.put("/todo", (req, res) => {});
router.delete("/todo", (req, res) => {});

module.exports = router;

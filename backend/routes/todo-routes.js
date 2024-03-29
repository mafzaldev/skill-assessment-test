const router = require("express").Router();
const todoControllers = require("../controllers/todo-controllers");

router.get("/todos", todoControllers.getTodos);
router.post("/todo", todoControllers.createTodo);
router.patch("/todo", todoControllers.updateTodo);
router.delete("/todo/:id", todoControllers.deleteTodo);

module.exports = router;

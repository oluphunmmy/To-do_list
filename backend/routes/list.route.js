const { Router } = require("express");

const {
  createTodos,
  getTodos,
  getTodo,
  updateToDo,
  deleteToDo
} = require("../controller/list.controller.js");

const router = Router();

router.post("/", createTodos)
router.get("/", getTodos)
router.get("/:id", getTodo)
router.put("/:id", updateToDo)
router.delete("/:id", deleteToDo)

module.exports = router;
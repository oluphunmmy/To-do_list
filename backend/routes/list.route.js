const { Router } = require("express");
const {verifyJWT} = require('./../controller/user.controller.js')

const {
  createTodos,
  getTodos,
  getTodo,
  updateToDo,
  deleteToDo
} = require("../controller/list.controller.js");

const router = Router();

router.post("/", verifyJWT, createTodos)
router.get("/", verifyJWT, getTodos)
router.get("/:id", verifyJWT, getTodo)
router.put("/:id", updateToDo)
router.delete("/:id", deleteToDo)

module.exports = router;
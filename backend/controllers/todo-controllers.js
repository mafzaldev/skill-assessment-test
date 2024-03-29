const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createTodo = async (req, res) => {
  const { title, createdAt } = req.body;

  if (!title || !createdAt)
    return res
      .status(400)
      .json({ message: "Title and createdAt fields are missing!" });

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        createdAt,
      },
    });
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTodo = async (req, res) => {
  const { id, title, isCompleted } = req.body;

  if (!id && (!title || !isCompleted))
    return res
      .status(400)
      .json({ message: "Id, title or isCompleted fields are missing!" });

  try {
    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title,
        isCompleted,
      },
    });
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is missing!" });

  try {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

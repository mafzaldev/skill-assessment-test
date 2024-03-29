const getTodos = async (req, res) => {
  try {
    res.status(200).json({ message: "Get all todos" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getTodos,
};

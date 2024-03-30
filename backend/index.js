const express = require("express");
const cors = require("cors");
dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("API is running... :confetti");
});

app.use("/api", require("./routes/todo-routes"));
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

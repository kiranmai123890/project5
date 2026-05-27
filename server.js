const express = require("express");
const cors = require("cors");
const runCode = require("./execute");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  try {
    const output = await runCode(language, code, input);

    res.json({
      success: true,
      output,
    });
  } catch (error) {
    res.json({
      success: false,
      output: error.toString(),
    });
  }
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
const express = require("express");
const { sequelize } = require("./models");
const app = express();
const port = 1234;
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/user");

app.use("/api/v2", userRouter);

app.listen(port, async () => {
  console.log(`Server is live on port ${port}`);
  await sequelize.authenticate();
  console.log(`Database Connected!!!`);
});

require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const app = express();
const port = 1234;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

const userRouter = require("./routes/user");

app.use("/api/v2", userRouter);

app.listen(port, async () => {
  console.log(`Server is live on port ${port}`);
  await sequelize.authenticate();
  console.log(`Database Connected!!!`);
});

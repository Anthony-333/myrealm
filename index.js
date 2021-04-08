const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// setup express server

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://myrealm.netlify.app","https://myrealm.com","http://myrealm.com","https://www.myrealm.com","http://www.myrealm.com"],
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// set up routers

app.use("/snippetwebsites", require("./routers/snippetRouterwebsite"));
app.use("/snippetinsurances", require("./routers/snippetRouterinsurances"));
app.use("/snippetbanks", require("./routers/snippetRouterbanks"));
app.use("/snippetmedias", require("./routers/snippetRoutermedias"));
app.use("/auth", require("./routers/userRouter"));

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

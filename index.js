// *Dependencies
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const {
  errorConvertor,
  errorHandler,
} = require("./middleware/errorMiddleware");
const ApiError = require("./config/error");

const app = express();

// *Imports Routes
const {
  authRoutes,
  userRoutes,
  diamondRoutes,
  userSearchReordRoutes,
  emailRoutes,
  contactUsRoutes,
} = require("./routes");

//  *MiddleWares
app.use(express.json());
// allowing frontend
app.use(
  cors({
    origin: "https://www.caretino.ca",
    credentials: true,
    methods: ["POST", "GET"],
  })
);

// app.get("/api/visitingCard/:imageName", (req, res) => {
//   let { imageName } = req.params;
//   return res.sendFile(path.join(__dirname, `./visitingCards/${imageName}`));
// });

// app.get("/api/documents/:imageName", (req, res) => {
//   let { imageName } = req.params;
//   return res.sendFile(path.join(__dirname, `./documents/${imageName}`));
// });

//  *Routes
app.use("/api/auth", authRoutes);
app.use("/api/diamond", diamondRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userSearchRecord", userSearchReordRoutes);
app.use("/api/contact", contactUsRoutes);
app.use("/api/email", emailRoutes);

// * Any Other route

app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Not Found"));
});

// *Error Handlers
app.use(errorConvertor);
app.use(errorHandler);

// *MongoDB Connection
mongoose
  .connect(process.env.MONGOOSE_URL, {
    serverSelectionTimeoutMS: 6000, // Set a higher timeout value (e.g., 60 seconds)
  })
  .then(() => {
    console.log(`Connected To DataBase `);

    // *Server Connection
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server Started at port no:${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(`Error With DataBase Connection ${error}`);
  });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require('helmet');
require('dotenv').config();


if (!process.env.JWT_KEY) {
  throw new Error("EXPRESS_SESSION_SECRET is not defined in environment variables");
}

const app = express();


// Security middleware
app.use(helmet());

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.JWT_KEY,
  cookie: { secure: false },
}));
app.use(flash());

// View engine setup
app.set('view engine', 'ejs');


// Routes
app.use("/", indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// Error handling

app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

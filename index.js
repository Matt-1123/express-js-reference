const express = require("express");
// Node JS module to deal with file paths:
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

// Initialize middleware
// app.use(logger);

// Body Parser Middleware
// allows us to handle raw JSON and handle form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set 'public' as the static folder
// This way we don't have to create a new route for every page. This works for everything in the public folder.
// The use() method is for middleware
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
// Note: "/api/members" is the parent route, and then require the file with routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pelangganRoutes = require("./routes/pelangganRoutes");
const usersRoutes = require("./routes/usersRoutes"); // Import routes users
const sequelize = require("./config/database"); // Pastikan sudah terhubung dengan database

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions)); // Middleware untuk mengaktifkan CORS
app.use(express.json()); // Middleware untuk parsing JSON

// Routes
app.use("/api/pelanggan", pelangganRoutes); // Routes pelanggan
app.use("/api/users", usersRoutes); // Routes users

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => console.error("Failed to sync database:", err));

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

require("dotenv").config();

const express = require("express");
console.log("===== STOCK TRADING BACKEND v2 =====");
console.log("Routes: /allHoldings and /allPositions");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

const PORT = process.env.PORT || 3003;
const uri = process.env.MONGODB_URI;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");
const { verifyToken } = require("./middleware/authMiddleware");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// In-memory store for short-lived, single-use auth handoff codes
const handoffStore = new Map();

// Periodic cleanup of expired handoff codes (older than 60s)
setInterval(() => {
  const now = Date.now();
  for (const [code, data] of handoffStore.entries()) {
    if (data.expiresAt < now) {
      handoffStore.delete(code);
    }
  }
}, 30000);

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done !");
// });


// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({

//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done !");
// });

app.get("/", (req, res) => {
  res.send("Stock Trading Backend is running!");
});

app.get("/test", (req, res) => {
  res.json({
    message: "Backend routes are working",
    holdingsRoute: "/allHoldings",
    positionsRoute: "/allPositions"
  });
});

app.get('/allHoldings', async(req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);

});

app.get('/allPositions', async(req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);

});

app.post('/newOrder', async(req, res) => {
  let newOrder = new OrdersModel({
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode:req.body.mode,
  });
  newOrder.save();
  res.send("Order saved !");
});

app.post('/signup', async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    if (!username || !email || !mobile || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      username,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT Token
    const secret = process.env.JWT_SECRET || "stock_trading_jwt_secret_key_2026";
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username },
      secret,
      { expiresIn: "3d" }
    );

    res.status(201).json({
      success: true,
      message: "Signup successful!",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email, mobile: newUser.mobile },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error during signup" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Create JWT Token
    const secret = process.env.JWT_SECRET || "stock_trading_jwt_secret_key_2026";
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      secret,
      { expiresIn: "3d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: { id: user._id, username: user.username, email: user.email, mobile: user.mobile },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error during login" });
  }
});

app.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Verify user error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Endpoint to create a short-lived single-use handoff code for redirecting to dashboard
app.post('/auth/create-handoff', (req, res) => {
  try {
    const { token, user } = req.body;
    if (!token || !user) {
      return res.status(400).json({ success: false, message: "Token and user are required" });
    }

    const code = crypto.randomBytes(32).toString("hex");
    handoffStore.set(code, {
      token,
      user,
      expiresAt: Date.now() + 60000, // Valid for 60 seconds
    });

    res.status(200).json({ success: true, code });
  } catch (error) {
    console.error("Create handoff error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Endpoint to exchange a short-lived handoff code for authentication details
app.post('/auth/verify-handoff', (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "Code is required" });
    }

    const handoffData = handoffStore.get(code);
    if (!handoffData) {
      return res.status(400).json({ success: false, message: "Invalid or expired handoff code" });
    }

    if (handoffData.expiresAt < Date.now()) {
      handoffStore.delete(code);
      return res.status(400).json({ success: false, message: "Handoff code expired" });
    }

    // Single-use: delete immediately after verification
    handoffStore.delete(code);

    res.status(200).json({
      success: true,
      token: handoffData.token,
      user: handoffData.user,
    });
  } catch (error) {
    console.error("Verify handoff error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

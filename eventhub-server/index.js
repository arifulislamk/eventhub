const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

const authenticateJWT = (req, res, next) => {
  const token = req?.header("Authorization").split(" ")[1];
  // console.log(token, "token pai");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zwicj3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const allUserData = client.db("eventhubDB").collection("allUser");
    // const other = client.db("eventhubDB").collection("other");

    app.post("/register", async (req, res) => {
      const info = req.body;
      const hashedPassword = await bcrypt.hash(info?.password, 10);
      const maininfo = { ...info, hashedPassword: hashedPassword };
      const result = await allUserData.insertOne(maininfo);
      res.send(result);
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const query = {
        $or: [{ email: email }],
      };
      const user = await allUserData.findOne(query);
      // console.log(emailornumber, pin, user);
      // console.log(user, "paichi");
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        user?.hashedPassword
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: "365day",
      });
      res.json({ token, email: user?.email });
    });
    app.get("/user/:email", authenticateJWT, async (req, res) => {
      const email = req.params.email;
      // console.log(email ,'d')
      const result = await allUserData.findOne({ email });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello developer");
});
app.listen(port, () => {
  console.log(`EventHub Running On Port ${port}`);
});

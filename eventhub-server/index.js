const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const events = client.db("eventhubDB").collection("event");

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

    app.post("/event", authenticateJWT, async (req, res) => {
      const event = req.body;
      const result = await events.insertOne(event);
      res.send(result);
    });

    // app.get("/events", async (req, res) => {
    //   const result = await events.find().toArray();
    //   res.send(result);
    // });
    app.get("/events", async (req, res) => {
      const search = req.query.search;
      const date = req.query.date;
      const attendeeCount = req.query.attendeeCount;
      const filter = {
        $or: [
          { eventName: { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
      let options = {};
      if (attendeeCount)
        options = {
          sort: { attendeeCount: attendeeCount === "asc" ? 1 : -1 },
        };
      if (date) options = { sort: { dateTime: date === "asc" ? 1 : -1 } };

      const result = await events.find(filter, options).toArray();
      res.send(result);
    });
    app.patch("/event/attendeecount/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id : new ObjectId(id) };
      const data = await events.findOne(filter) ;
        // console.log(id, data);
      const updateDoc = {
        $set: {
          attendeeCount: data?.attendeeCount + 1,
        },
      };
      const result = await events.updateOne(filter, updateDoc);
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

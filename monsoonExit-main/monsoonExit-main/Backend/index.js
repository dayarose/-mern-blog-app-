const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

//Write missing code here
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});
const BlogModel = mongoose.model("blog", blogSchema);

//Write your POST API here
app.post("/add", async (req, res) => {
  try {
    const newBlog = new BlogModel(req.body);
    await newBlog.save();
    res.status(200).send({ message: "Blog added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.send({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Delete failed" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "Blog updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: "Update failed" });
  }
});

app.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.send(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch blogs" });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
}); 
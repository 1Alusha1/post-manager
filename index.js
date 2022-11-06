import express from "express";
import UserAsync from "./aync/async.js";

let userAsync = new UserAsync();

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/create-post", (req, res) => {
  res.render("createPost");
});

app.post("/create-post", (req, res) => {
  res.render("createPost");
  userAsync.setPost(req.body);
});

app.get("/posts", (req, res) => {
  userAsync.getPosts().then((data) => res.render("posts", { posts: data }));
});

app.get("/posts/:id", async (req, res) => {
  userAsync.getPost(req.params.id).then((data) => {
    res.render("post", { post: data });
  });
  switch (req.query.action) {
    case "remove":
      userAsync.remove(req.query.id);
    default:
      break;
  }
});

app.post("/posts/:id", (req, res) => {
  userAsync.change(req.body);
  res.end(0);
});

app.get("/post-remove", (req, res) => {
  res.render("postRemove");
});

// app.use((req, res) => {
//   res.status(404).render("404");
// });

app.listen(3000 || process.env.PORT, () => console.log("Server was started"));

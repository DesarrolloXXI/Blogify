const Post = require("../models/post");

const posts = [
  {
    title: "Primer post",
    summary: "Esto es un post",
    content: "Nuestro primer post desde el servidor",
  },
  {
    title: "Segundo post",
    summary: "Esto es un post",
    content: "Felicitaciones",
  },
];

exports.getMessage = (req, res) => {
  res.send("Hola Mundo!");
};

exports.getPosts = (req, res) => {
  Post.find().then((postResult) => {
    res.status(200).json(postResult);
  });
};

exports.addPost = (req, res) => {
  console.log(req.body);
  //posts.push(req.body);
  const postAdd = new Post({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
  });

  postAdd.save().then((createdPost) => {
    console.log(createdPost);
    res.status(201).json({ message: "Post creado" });
  });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Post eliminado" });
    } else {
      res.status(200).json({ message: "Post no encontrado" });
    }
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  const post = new Post({
    _id: id,
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
  });

  Post.updateOne({ _id: id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Actualización exitosa" });
  });
};

exports.getPost = (req, res) => {
  const id = req.params.id;

  Post.findById(id).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
};

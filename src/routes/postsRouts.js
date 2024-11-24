import express from "express";
import multer from "multer";
import { listarPosts, criarPost, uploadImg, atualizarNovoPost, deletPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads", storage});

const routes = (app) => {
    app.use(express.json());
    app.get("/post", listarPosts);
    app.post("/post", criarPost);
    app.post("/upload", upload.single("img"), uploadImg);
    app.put("/upload/:id", atualizarNovoPost);
    app.delete("/post/:id", deletPost);
};

export default routes;
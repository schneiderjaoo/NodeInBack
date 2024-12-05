import { getAllPosts, createNewPost, atualizarPost, deletarPost, getPostById } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../service/serviceGemini.js";

export async function listarPosts(req, res) {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (erro) {
        console.error("Erro ao listar posts:", erro.message);
        res.status(500).json({ "Erro": "Erro ao listar posts" });
    }
}

export async function getPost(req, res) {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.error("Erro ao listar post:", erro.message);
    res.status(500).json({ "Erro": "Erro ao listar post" });
  }
}

export async function criarPost(req, res) {
    const newPost = req.body;

    try {
        const post = await createNewPost(newPost);
        res.status(201).json(post);
    } catch (erro) {
        console.error("Erro ao criar post:", erro.message);
        res.status(500).json({ "Erro": "Erro ao criar post" });
    }
}

export async function uploadImg(req, res) {
    const tempPath = req.file.path;
    const imgId = new Date().getTime();
    const finalPath = `uploads/${imgId}.png`;

    try {
        fs.renameSync(tempPath, finalPath);

        const imgBuffer = fs.readFileSync(finalPath);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const newPost = {
            descricao: descricao,
            img: `${imgId}.png`,
            alt: ""
        };

        const post = await createNewPost(newPost);

        res.status(201).json(post);
    } catch (erro) {
        console.error("Erro ao fazer upload da imagem:", erro.message);
        res.status(500).json({ "Erro": "Erro ao fazer upload da imagem" });
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/uploads/${id}.png`;

    try {
        const post = {
            imgUrl: urlImagem,
            descImg: req.body.alt || ""
        };

        const postAtualizado = await atualizarPost(id, post);
        res.status(200).json(postAtualizado);
    } catch (erro) {
        console.error("Erro ao atualizar post:", erro.message);
        res.status(500).json({ "Erro": "Erro ao atualizar o post" });
    }
}

export async function deletPost(req, res) {
    const id = req.params.id;

    try {
        const resultado = await deletarPost(id);

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ "Erro": "Post não encontrado" });
        }

        res.status(200).json({ "Mensagem": "Post deletado com sucesso" });
    } catch (erro) {
        console.error("Erro ao deletar post:", erro.message);
        res.status(500).json({ "Erro": "Erro ao deletar post" });
    }
}

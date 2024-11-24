import { getAllPosts, createNewPost, atualizarPost, deletarPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../service/serviceGemini.js";

export async function listarPosts(req, res) {
    const get = await getAllPosts();
  res.status(200).json(get);
}

export async function criarPost(req, res) {
  const newPost = req.body;
  try {
      const post = await createNewPost(newPost);
      res.status(200).json(post);
  } catch (erro) {
      console.error("Erro ao criar post:", erro.message);
      res.status(500).json({ "Erro": "Erro ao criar post" });
  }
}

export async function uploadImg(req, res) {
  const newPost = {
    descricao: "",
    img: req.file.originalname,
    alt: ""
  }

  try {
      const post = await createNewPost(newPost);
      const imgAtualizada = `uploads/${post.insertedId}.png`
      fs.renameSync(req.file.path, imgAtualizada);
      res.status(200).json(post);
  } catch (erro) {
      console.error("Erro ao criar post:", erro.message);
      res.status(500).json({ "Erro": "Erro ao criar post de imagem" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/uploads/${id}.png`;

  try {
      const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imgBuffer);

      const post = {
          imgUrl: urlImagem,
          descricao: descricao,
          descImg: req.body.alt
      }

      const postNovo = await atualizarPost(id, post);
      res.status(200).json(postNovo);
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

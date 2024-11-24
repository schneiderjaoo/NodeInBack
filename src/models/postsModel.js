import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db = conexao.db("imersao");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function createNewPost(newPost) {
    const db = conexao.db("imersao");
    const colecao = db.collection("posts");
    return colecao.insertOne(newPost);
}

export async function atualizarPost(id, newPost) {
    const db = conexao.db("imersao");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set: newPost});
}

export async function deletarPost(id) {
    const db = conexao.db("imersao");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id);

    return colecao.deleteOne({ _id: new ObjectId(objectId) });
}

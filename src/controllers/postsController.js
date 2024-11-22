import fs from "fs";
import {getTodosPosts, criarPost} from "../models/postsModel.js";

export async function listarPosts(req, res) {
    // Chama a função getTodosPosts() para buscar todos os posts.
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON.
    res.status(200).json(posts);
} 

export async function postarNovoPost(req, res) {
    const novosPost = req.body;
    try {
        const postCriado = await criarPost(novosPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        return res.status(201).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        return res.status(500).json({"erro": "Falha na requisição"})
    }
}
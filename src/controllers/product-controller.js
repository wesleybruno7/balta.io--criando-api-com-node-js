'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

// metodo busca todos os produtos ativos cadastrados no mongodb e lista as informacoes filtradas (idm titulo, preco e slug)
exports.get = (req, res, next) => {
    repository
    .get()
    .then( data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    });
}
//metodo de buscar cadastros por slug do produto no mongodb
exports.getBySlug = (req, res, next) => {
    repository
    .getBySlug(req.params.slug)
    .then( data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    });
}

//metodo de buscar cadastros por ID do produto no mongodb
exports.getById = (req, res, next) => {
    repository
    .getById(req.params.id)
    .then( data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send({ 
            message: 'Falha ao cadastrar o produto',
            data: e
        });
    });
}

//metodo de buscar cadastros por ID do produto no mongodb
exports.getByTag = (req, res, next) => {
    repository
    .getByTag(req.params.tag)
    .then( data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send( e );
    });
}

exports.post = (req, res, next) => {

    // adiciona uma verificacao antes de salvar o registro no banco de dados
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    // se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
        .then( x => {
            res.status(201).send({ 
                message: 'Produto cadastrado com sucesso!'
            });
        }).catch( e => {
            res.status(400).send({ 
                message: 'Falha ao cadastrar o produto',
                data: e
            });
        });
    
};

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, req.body)
    .then ( x => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch( e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            })
        });
};

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then ( x => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch( e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            })
        });
};
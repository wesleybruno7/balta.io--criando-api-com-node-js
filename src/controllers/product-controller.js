'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// metodo busca todos os produtos ativos cadastrados no mongodb e lista as informacoes filtradas (idm titulo, preco e slug)
exports.get = (req, res, next) => {
    Product
    .find({
        active: true
    }, 'title price slug')
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
    Product
    .findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags')
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
    Product
    .findById( req.params.id)
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
    Product
    .find({
        tags: req.params.tag,
    }, 'title description price slug tags')
    .then( data => {
        res.status(200).send(data);
    }).catch( e => {
        res.status(400).send( e );
    });
}

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
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
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then ( x => {
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
    Product
        .findByIdAndRemove(req.body.id)
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
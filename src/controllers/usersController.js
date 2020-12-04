const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')

let usuarios = fs.readFileSync(path.join(__dirname, '../database/users.json'), 'utf8');
usuarios = JSON.parse(usuarios)

let ultimoId = 0;
for(let i = 0; i < usuarios.length; i++) {
    if(ultimoId < usuarios[i].id) {
        ultimoId = usuarios[i].id
    }
}

module.exports = {
    register: function(req, res) {
        res.render('register')
    },
    save: function(req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            let nuevoUsuario = {
                id: ultimoId + 1,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 12),
                avatar: req.file.filename
            }
            usuarios.push(nuevoUsuario);
            fs.writeFileSync(path.join(__dirname, '../database/users.json'), JSON.stringify(usuarios, null, 4))
            res.redirect('/users/login');   
        } else {
            res.send(errors.mapped())
        }
    },
    login: function(req, res) {
        res.render('login');
    }
}
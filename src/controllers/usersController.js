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
    },
    logged: function (req, res) {
        let errors = validationResult(req);
        let { email, password, remember } = req.body;
        if (errors.isEmpty()) {
            let usuarioALoguearse;

            usuarios.forEach(user => {
                if (user.email === email && bcrypt.compareSync(password, user.password)) {
                     usuarioALoguearse = user;
                }
            });

            if (usuarioALoguearse == undefined) {
                return res.send('Credenciales invalidas');
            } 

            req.session.user = usuarioALoguearse;

            if (remember != undefined) {
                res.cookie('remember', usuarioALoguearse.email, { maxAge: 60000 });
            }
            return res.redirect('/');

        } else {
            return res.send(errors.mapped());
        }

    },
    profile: function (req, res) {
        return res.send('perfil');
    }
}
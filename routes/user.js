const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (exUser){
            return res.status(403).send("이미 사용중인 아이디 입니다.");    
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            nickanme: req.body.nickanme,
            password: hashedPassword,
        });
        res.status(201).send('ok');
    } catch(error){
        console.error(error);
        next(error); // status 500
    }
    
//POST /USER
});
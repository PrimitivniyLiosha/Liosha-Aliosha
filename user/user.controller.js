const mongoose = require("mongoose");
const User = require("./user.router");
const bcrypt = require("bcrypt");
const settings = require("../settings");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    bcrypt.hash(req.body.password, settings.ROUNDS,function (err, hash) {
        console.log(hash);
        User.create({
            _id : mongoose.Types.ObjectId(),
            name : req.body.name,
            email : req.body.email,
            password : hash
        })
        .then(newUser => {
            return res.status(200).json(newUser);
        })
        .catch(err => {
            return res.status(402).json(err);
        })
    });
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email : req.body.email});
    console.log(user);
    if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        console.log(result);
        if (result == false) {
            res.status(401).json({
                message : "Login failed"
            })
        }
    }
    else {
        res.status(401).json({
            message : "User not found"
        })
    }
    const token = jwt.sign({ userId : user._id }, settings.jwt_secret );
    return res.status(200).json({
        user : user,
        token : token
    });
}
const router = require('express').Router();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');
router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10 ) //  criating hash code for password field
    .then(hash => {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hash  // Storing password as a hash code
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    status:1,
                    message: 'User Created',
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    status:0,
                    err: err
                });
            })
    });
});

router.post("/login", (req, res, next) => {
    let fetcheUser;
    User.findOne({ email: req.body.email }).then(user => {
        if(!user) {
            return res.status(401).json({
                status:0,
                message : "Authentication Failed"
            });
        }
        fetcheUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if(!result) {
            return res.status(401).json({
                status:0,
                message : "Authentication Failed"    
            });
        }  // Creating token
        const token = jwt.sign(
            { email: fetcheUser.email, userId: fetcheUser._id },
            "secret_this_should_be_longer",
            { expiresIn: "1h" });
            res.status(200).json({
                token: token,
                expiresIn : 3600
            });
    }).catch(err => {
            return res.status(401).json({
                status:0,
            message : "Authentication Failed"    
        });
    });
});

router.get("/get-all-users", checkAuth, (req, res, next) => {
    User.find({}).then(users => {
        res.status(200).json({
            status:1,
            message: "User List:",
            data: users
        });
    })
    .catch(err => {
            return res.status(401).json({
                status:0,
            message : "Authentication Failed"  ,
            error: err  
        });
    });
});

module.exports = router;
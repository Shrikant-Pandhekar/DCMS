const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signup, signin, signout} = require('./../controllers/auth')

router.post(
    '/signup',
    [
        check('firstname','Firstname must be more than 2 char').isLength({ min: 2 }), 
        check('lastname','Lastname must be more than 2 char').isLength({ min: 2 }), 
        check('email','Invalid Email').isEmail(),
        check(
            'password',
            'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.',
        )
        .isLength({ min:8})
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        ),
    ],
    signup
);

router.post(
    '/signin',
    [
        check('email','Invalid Email').isEmail(),
        check('password','Password is required').isLength({ min: 1 }),
    ],
    signin
);

router.get('/signout', signout);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getAdminById, isAdminSignedin, isAdminAuthenticated, isAdmin } = require('./../controllers/admin')
const { createService, getAllServices } = require('./../controllers/service')

router.param("adminId", getAdminById);

router.post(
    '/service/create/:adminId', 
    isAdminSignedin,
    isAdminAuthenticated,
    isAdmin,
    createService
);

router.get('/service/all', getAllServices);

module.exports = router;
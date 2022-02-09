const express = require('express');
const router = express.Router();
const { getAdminById, isAdminSignedin, isAdminAuthenticated, isAdmin } = require('./../controllers/admin')
const { createBlog, getAllBlogs, getBlogPostById, getBlogPost , deleteBlogPostById, deleteBlogPost} = require('./../controllers/blog')

router.param("blogId", getBlogPostById);

router.post(
    '/blog/create',

    isAdminSignedin,
   // isAdminAuthenticated,
    // isAdmin,
    createBlog
);

router.get('/blog/all', getAllBlogs);
router.get('/blog/:blogId', getBlogPostById , getBlogPost);
router.get('/blog/delete/:blogId', deleteBlogPostById );

module.exports = router;
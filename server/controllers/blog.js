const Blog = require('../models/blog');

exports.createBlog = async (req,res) => {

    const {title, author, description, imgurl} = req.body;

    if (!title || !description ) {
        return res.status(422).json({error:"Please fill all fields properly ..."});
    }
    
    try {

        const blogExists = await Blog.findOne({title:title});
        
        if (blogExists) {
            return res.status(422).json({error:"Blog already exist"});
        }

        const blog = new Blog(req.body);

        const blogRegistered = await blog.save();

        if (blogRegistered) {
            return res.status(201).json({message: "Blog Added Successfully ..."});
        }
        else {
            return res.status(500).json({error: "Failed to Add"});
        }
        
    } catch (error) {
        console.log(error);
    }    
}

exports.getAllBlogs = async (req,res) => {

    try {

        const blogs = await Blog.find();

        if (blogs) {
            return res.status(200).json(blogs);
        }
        
    } catch (error) {
        return res.status(400).json({
            error: "NO blogs found in database"
        });
    }
}

exports.getBlogPostById = async (req, res, next, id) => {

    try {

        const blogpost = await Blog.findById(id);

        if (!blogpost) {
            return res.status(400).json({
                error: "NO BLog found in database"
            });
        }

        req.blogpost = blogpost;
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: "NO Blog found in database"
        });
    }
};

exports.deleteBlogPostById = async (req, res, id) => {

    try {

        const blogs = await Blog.find();

        if (blogs) {
            return res.status(200).json(blogs);
        }
        
    } catch (error) {
        return res.status(400).json({
            error: "NO blogs found in database"
        });
    }
}

exports.getBlogPostById = async (req, res, next, id) => {

    try {

        const blogpost = await Blog.findById(id);
        

        if (!blogpost) {
            return res.status(400).json({
                error: "NO BLog found in database"
            });
        }else{
            const deleteblogpost = await blogpost.remove();
            if(deleteblogpost){
                console.log(deleteblogpost);
            }
        }

        req.blogpost = {status:"Deleted"};
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "error"
        });
    }
};

exports.getBlogPost = async (req, res) => {

    try {

        const blogpost = req.blogpost
        if (!blogpost) {
            return res.status(400).json({
                error: "NO BLog found in database"
            });
        }

        return res.status(200).json(
            blogpost
        );        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "NO Blog found in database"
        });
    }
};


exports.getAdminById = async (req, res, next, id) => {
  try {
    const admin = await Admin.findById(id);

    console.log(admin);

    if (!admin) {
      return res.status(400).json({
        error: "You do not have authority",
      });
    }

    req.profile = admin;

    next();
  } catch (error) {
    return res.status(400).json({
      error: "NO Admin found",
    });
  }
};


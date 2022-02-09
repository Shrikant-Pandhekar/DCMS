const Review = require("../models/review");
const User = require("../models/user");

exports.createReview = async (req, res) => {
  const { email, username, message } = req.body;

  if (!email || !message || !username) {
    return res
      .status(422)
      .json({ error: "Please fill all fields properly ..." });
  }

  try {
    const reviewExists = await Review.findOne({ message: message });

    if (reviewExists) {
      return res.status(422).json({ error: "Review already exist" });
    }

    const userObject = await User.findOne({ email: email });

    if (!userObject) {
      return res.status(400).json({
        error: `User does not exists !`,
      });
    }

    const updatedFields = {
      user: userObject.id,
      username: username,
      message: message,
      
    };

    const review = new Review(updatedFields);

    const reviewCreated = await review.save();

    if (reviewCreated) {
      res.status(200).json(reviewCreated);
    }
  } catch (error) {
    res.status(400).json({
      error: "Saving Failed",
    });
  }
};

exports.updateReview = async (req, res) => {

  try {

    const review = req.review
    console.log(review)

    review.isApproved=true;
    
    review.save();

    return res.status(200).json({
            success : "Review Approved Successfully"
        });
  } catch (error) {
    res.status(400).json({
      error: "Saving Failed",
    });
  }
};
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user");

    if (reviews) {
      return res.status(200).json(reviews);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO Reviews found in database",
    });
  }
};

exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({isApproved: false});

    if (reviews) {
      return res.status(200).json(reviews);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO Reviews found in database",
    });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({isApproved: true});

    if (reviews) {
      return res.status(200).json(reviews);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO Reviews found in database",
    });
  }
};

exports.getReviewById = async (req, res, next, id) => {
  try {
    const review = await Review.findById(id);


    if (!review) {
      return res.status(400).json({
        error: "No review 1",
      });
    }

    req.review = review;

    next();
  } catch (error) {
    return res.status(400).json({
      error: "NO Review found",
    });
  }
};

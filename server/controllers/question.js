const Question = require('../models/question');
const User = require('../models/user')

exports.createQuestion = async (req,res) => {

    const {email, que} = req.body;

    // if ( !email || !question ) {
    //     return res.status(422).json({error:"Please fill all fields properly ..."});
    // }

    try {

        const questionExists = await Question.findOne({ question: que });

        if (questionExists) {
            return res.status(422).json({error:"Question already exists"});
        }
        
        const userObject = await User.findOne({ email: email });

        if (!userObject) {
        return res.status(400).json({
            error: `User does not exists !`,
        });
        };

        

        const updatedFields = {
            user : userObject.id,
            email: email,
            question: que,
        }
         

        const question = new Question(updatedFields);
        const questionCreated = await question.save()

        console.log(questionCreated)
        if (questionCreated) {
            return res.status(201).json({message: "Question Added Successfully ..."});
        }
        else {
            return res.status(500).json({error: "Failed to Add"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Saving Failed"
        })
    }
}

exports.getAllQuestions = async (req,res) => {

    try {

        const questions = await Question.find();

        if (questions) {
            return res.status(200).json(questions);
        }
        
    } catch (error) {
        return res.status(400).json({
            error: "NO Questions found in database"
        });
    }
}
 
exports.getQuestion = async (req, res) => {

    try {

        const questions = await Question.find({user: req.user.id});
        console.log(questions);
        if (!questions) {
            return res.status(400).json({
                error: "NO Question found in database"
            });
        }

                        return res.status(200).json(questions);

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "Error"
        });
    }
};

exports.getUnansweredQuestions = async (req,res) => {

    try {

        const questions = await Question.find({ answer : "unanswered" });

        if (questions) {
            return res.status(200).json(questions);
        }
        
    } catch (error) {
        return res.status(400).json({
            error: "NO Questions found in database"
        });
    }
}
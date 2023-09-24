import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const userId = req.userId;
    const postQuestion = new Questions({ ...postQuestionData, userId });
    // await Questions.findByIdAndUpdate(userId);
    console.log(req.body)

    try {
        await postQuestion.save();
        res.status(200).json("Posted a Question successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("couldn't post a new question.")
    }
};

export const getById = async (req, res) => {
    console.log("suhail");
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }
    try {
        const question = await Questions.findById(_id)
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllQuestions = async (req, res) => {
    console.log("suhail");
    const { id: _id } = req.params;

    try {
        const questionList = await Questions.find().sort({ askedOn: -1 });;
        res.status(200).json(questionList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({ message: "Successfullyy deleted..." })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable..');
    }

    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }

        else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json({ message: "Voted successfully..." })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "id not found" })
    }
}

export const editQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const updatedQuestionData = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Question unavailable...");
    }
  
    try {
      // Find the existing question by ID
      const existingQuestion = await Question.findById(_id);
  
      if (!existingQuestion) {
        return res.status(404).send("Question not found...");
      }
  
      // Update the question with the new data
      existingQuestion.questionTitle = updatedQuestionData.questionTitle;
      existingQuestion.questionBody = updatedQuestionData.questionBody;
      existingQuestion.questionTags = updatedQuestionData.questionTags;
      // Update other fields as needed
  
      // Save the updated question
      await existingQuestion.save();
  
      res.status(200).json({ message: "Question updated successfully..." });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

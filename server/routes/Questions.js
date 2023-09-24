import express from 'express'
import { AskQuestion, getAllQuestions, deleteQuestion, voteQuestion, editQuestion, getById } from '../controllers/Questions.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/Ask", auth, AskQuestion);
router.get('/get', getAllQuestions);
router.get('/getbyId/:id', getById);
router.delete('/delete/:id', auth, deleteQuestion);
router.patch('/edit/:id', auth, editQuestion);
router.patch('/vote/:id', auth, voteQuestion);

export default router
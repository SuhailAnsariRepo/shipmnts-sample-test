import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './AskQuestion.css'
import { editQuestion } from '../../actions/Question.js'
// QuestionDetail.js

const QuestionDetail = ({ question }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({ title: question.title, body: question.body });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Dispatch the editQuestion action with editedQuestion and question ID
    dispatch(editQuestion(question.id, editedQuestion));
    setIsEditing(false);
  };

  return (
    <div>
      <h1>{question.title}</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedQuestion.title}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
          />
          <textarea
            value={editedQuestion.body}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, body: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>{question.body}</p>
          {user && user.id === question.askedBy && (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;

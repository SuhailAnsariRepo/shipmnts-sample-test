import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/Question';
import { fetchAllUsers } from './actions/users';





function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])



  return (
    <div className="App">
      <Router >


        <Navbar />

        <AllRoutes />

      </Router>


    </div>
  );
}

export default App;

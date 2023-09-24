import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import EditQuestion from './pages/AskQuestion/EditQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import Success from "./pages/Subscription/Success";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
        <Route path = '/' element={<Home />} />
  
        <Route path = '/Auth' element={<Auth />} />

        <Route path = '/Questions' element={<Questions />} />

        <Route path = '/AskQuestion' element={<AskQuestion />} />

        <Route path = '/EditQuestion' element={<EditQuestion />} />

        <Route path = '/Questions/:id' element={<DisplayQuestion />} />

        <Route path = '/Tags' element={<Tags />} />

        <Route path = '/Users' element={<Users />} />

        <Route path = '/Users/:id' element={<UserProfile />} />

        <Route
        path="/Subscription"
        element={<SubscriptionPage slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />

      <Route path="/paymentsuccess" element={<Success />} />

      
    </Routes>
  )
}


export default AllRoutes
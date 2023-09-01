
import { useDispatch } from 'react-redux';
import AllRoutes from './Allroutes/AllRoutes';
import './App.css';
import Navbar from './Components/Navbar';
import { useEffect } from 'react';

import { autoLogin } from './features/authSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const navigateCallback = (responseData) => {
    if (responseData.role === 'reader') {
      navigate("/allposts")
    } else if (responseData.role === 'author') {
      navigate("/addpost")
    }
  };

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      dispatch(autoLogin({ token, navigateCallback }))
    } else {
      navigate("/allposts")
    }
  }, [dispatch])
  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;


import { useDispatch } from 'react-redux';
import AllRoutes from './Allroutes/AllRoutes';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const dispatch = useDispatch()
  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;

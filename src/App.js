import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import ShowUsers from './components/ShowUsers'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='users' element={<ShowUsers/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

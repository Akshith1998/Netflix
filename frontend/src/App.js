import "./App.scss"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Components/Home/Home";
import Watch from "./Components/Video_Play/Watch";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Protected from "./Components/Protected_Route/Protected";
import MyList from "./Components/MyList/MyList";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Protected><Home/></Protected>}/>
      <Route path="/movies" element={<Protected><Home type="movies"/></Protected>}/>
      <Route path="/series" element={<Protected><Home type="series"/></Protected>}/>
      <Route path="/watch" element={<Protected><Watch/></Protected>}/>
      <Route path="/mylist" element={<Protected><MyList/></Protected>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

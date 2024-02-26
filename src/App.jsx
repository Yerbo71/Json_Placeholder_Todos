import {BrowserRouter,Routes,Route} from "react-router-dom";
import Todos from "./components/Todos";
import NewTodo from "./components/NewTodo";
import NoPage from "./components/NoPage";
import Edit from "./components/Edit";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos/>}/>
        <Route path="/newTodo" element={<NewTodo/>}/>
        <Route path="/:id" element={<Edit/>}/>
        <Route path='*' element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App

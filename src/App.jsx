import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MenubarComponent} from "./components/menu/MenuComponent.jsx";
import LoginComponent from "./components/login/LoginComponent.jsx";
import ReadsAndReadComponent from "./components/crud/ReadsAndReadComponent";
import UpdateComponent from "./components/crud/UpdateComponent.jsx";
import CreateComponent from "./components/crud/CreateComponent.jsx";

// import './App.css'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* path main "/"  render 2 compoennts */}
                    <Route path={"/"} element={<MenubarComponent/>}>
                        {/* *** sub path main "/todo1,2,3" (still render on path main)
                         */}
                        <Route path={"/login"} element={<LoginComponent/>}/>
                        <Route path={"/reads-and-read"} element={<ReadsAndReadComponent/>}/>
                        <Route path={"/read/edit"} element={<UpdateComponent/>}/>
                        <Route path={"/create"} element={<CreateComponent/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App

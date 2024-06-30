import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser}= useContext(AuthContext);
  console.log("App js file",currentUser);
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/Login"/>
    }return children
  }
  return (
<div>
    <Routes>    
       <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
       <Route  path="Register"  element={<Register/>}></Route> 
        <Route path="Login" element={<Login/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;

//import logo from './logo.svg';
//import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"; 
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
//import { FirstComponent } from './components/FirstComponent.js';
import { PDGButton } from "./components/PDGButton.js";

/*const Begin = () => <h2>begin - Estas apunto de vivir una experiencia distinta</h2>

const Login = () => <h2>login  - Necesitamos saber quien eres</h2>

const Tags = () => <h2>tags - Escoge 5 palabras que mas te definen</h2>

const Final = () => <h2>final - Revisa el stand</h2>

const inLineStyle = {
  padding: 5
}

const App = () =>{

  return(
    
    <BrowserRouter>  
      <header>
        <Link to="/" style={inLineStyle}>
          Begin
        </Link>
        <Link to="/login" style={inLineStyle}>
          Login
        </Link>
        <Link to="/tags"style={inLineStyle}>
          Tags
        </Link>
        <Link to="/final"style={inLineStyle}>
          Final
        </Link>
      </header>
    </BrowserRouter>
  )

}*/

function App() {
  return (
    <div className="App">
      <h2>Estas apunto de vivir una experiencia distinta</h2>
      <PDGButton></PDGButton>
    </div>
  );
}

export default App;

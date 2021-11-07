import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from "./Components/ProductList";
import {Container} from "react-bootstrap";
import ClientList from './Components/ClientList';
import { useState } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const fakeClients = [
    { userId: '1', name: "Mario", surname: "Rossi", email: "m@gmail.com" },
    { userId: '2',name: "Mario", surname: "Rossi", email: "m@gmail.com" },
    { userId: '3',name: "Mario", surname: "Rossi", email: "m@gmail.com" },
    { userId: '4', name: "Mario", surname: "Rossi", email: "m@gmail.com" },
  ];

function App() {
    const [clients, setClients] = useState([...fakeClients]);
  return (
      <>
      <NavBar/>
    <Router>
    <Container>
      <Switch>
        <Route path='/clients' render={() =>
         <ClientList clients={clients} ></ClientList>
        }>
        </Route>
        <Route path="/products" render={() =>
          <ProductList/> 
               }>
        </Route>
      </Switch>
    </Container>
  </Router>
    </>

  );
}

export default App;

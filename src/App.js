import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const LoginScreen = React.lazy(() => import('./screen/LoginScreen'))
const HomeScreen = React.lazy(() => import('./screen/HomeScreen'))
const AddUser = React.lazy(() => import('./screen/AddUserScreen'))

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component = {LoginScreen}/>
              <Route exact path="/home/:role" component = {HomeScreen}/>
              <Route exact path="/new" component = {AddUser}/>
            </Switch>
          </Suspense>
        </BrowserRouter>
    </div>
  );
}

export default App;

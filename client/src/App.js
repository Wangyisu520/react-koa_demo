import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch ,Redirect} from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Langing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import Dashboard from './components/dashboard/Dashboard'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'

import Posts from './components/posts/Posts'
import Post from './components/post/Post'

import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

//私有路由配置
import PrivateRoute from './common/PrivateRoute'

import store from './store'
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './actions/authActions';
import CreateProfile from './components/create-profile/CreateProfile';



if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  //检测token是否过期
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //推出登陆
    store.dispatch(logoutUser())
    //清楚用户信息

    //跳转页面
    window.location.href = "/login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" component={Langing} exact />
            <div className="contaier">
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/profiles" component={Profiles} exact />
              <Route path="/profile/:handle" component={Profile} exact />

              <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/create-profile" component={CreateProfile} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/edit-profile" component={EditProfile} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-experience" component={AddExperience} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-education" component={AddEducation} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/feed" component={Posts} exact />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:id" component={Post} exact />
              </Switch>
              {
                !localStorage.jwtToken ?<Switch><Redirect for="/*" to="/" /></Switch>: <Switch><Redirect for="/*" to="/dashboard" /></Switch>
              }
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }

}

export default App;

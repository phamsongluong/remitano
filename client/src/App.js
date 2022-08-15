import React, { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import ShareVideo from "./components/share-video.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }
  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }
  logOut() {
    this.props.dispatch(logout());
  }
  render() {
    const user = this.props.user;
    return (
      <BrowserRouter location={history.location} navigator={history} >
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
              Funny Movies
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link to="/user" className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
            {user ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    {user?.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/share" className="nav-link">
                    Share a movie
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/user" element={<BoardUser />} />
              <Route exact path="/share" element={<ShareVideo />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);

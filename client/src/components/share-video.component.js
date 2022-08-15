import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class shareVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loading: false,
    };
  }

  shareVideo = (e) => {
    e.preventDefault();
    console.log(this.state.url);
  }

  onChangeUrl = (e) => {
    this.setState({
        url: e.target.value,
      });
  }
  
  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
      }
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.shareVideo}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Youtube URL</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.url}
                onChange={this.onChangeUrl}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Share</span>
              </button>
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    };
}
export default connect(mapStateToProps)(shareVideo);
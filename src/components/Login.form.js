import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const LoginForm = () => {
  const loginSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);

  };

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <form autocomplete="off" onSubmit={loginSubmit}>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-4">
            <h2> Login</h2>
          </div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                id="new-email"
                type="text"
                name="new-email"
                placeholder="Username"
              />
              <label htmlFor="email">Username</label>
            </span>
          </div>
          <div className="p-4"></div>
          <div className="p-field p-col-12 p-md-12">
            <span className="p-float-label">
              <InputText
                name="new-password"
                id="new-password"
                autocomplete="new-password"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>

          <div className="p-field p-col-12 p-md-12 p-2">
          </div>
          <div className="p-field p-col-12 p-md-12">
            <Button type="submit" label="Login" />
          </div>
          <div className="p-field p-col-12 p-md-12 p-2">
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <Button type="logout" label="Logout" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

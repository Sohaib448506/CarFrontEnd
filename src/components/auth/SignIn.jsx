import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

import "./style.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginError = useSelector((state) => state.auth?.loginError);

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await dispatch(login(email, password));

    if (result?.token) {
      navigate("/cars-management");
    }
  };

  return (
    <div className={"auth_screen_container"}>
      <Card
        style={{
          display: "flex",
          width: "350px",
          minHeight: "260px",
          borderRadius: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              autoComplete="on"
              placeholder="Email/userName"
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              autoComplete="on"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>
          {loginError ? (
            <p
              style={{
                color: "red",
                margin: "-15px 0px 0px",
                textAlign: "center",
              }}
            >
              {typeof loginError?.error?.reason === "string"
                ? loginError?.error?.reason
                : "Invalid User Name/Password"}
            </p>
          ) : null}

          <Form.Item style={{ textAlign: "center", marginTop: "15px" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;

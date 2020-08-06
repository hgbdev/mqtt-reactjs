import React, { useState, useEffect } from "react";

import {
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import { Button } from "reactstrap";

import fetch from "./../helper/fetch";

const Forms = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const onRegister = (e) => {
    e.preventDefault();
    async function request() {
      try {
        const res = await fetch.POST("/api/register", {
          username: data.username,
          password: data.password,
          email: data.email,
        });
        const parserDataJson = await res.json();
        console.log(parserDataJson);
        if(parserDataJson.success === false) throw parserDataJson;
        else {
          alert("REGISTER SUCCESS!");
          props.history.push('/login');
        }
      } catch (err) {
        alert(err.msg || "Wrong something!");
      }
    }
    request();
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Register Page | MQTT Console Broker
                </CardTitle>
              </CardHeader>
              <CardBody>
                <form>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter Username"
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Button color="primary" type="submit" onClick={onRegister}>
                    REGISTER
                  </Button>
                </form>
              </CardBody>
              <CardFooter>
                <p>© 2020 - BinaryHub | giaboidev</p>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Forms;

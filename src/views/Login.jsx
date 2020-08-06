import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { Button } from "reactstrap";
import fetch from "./../helper/fetch";
import { Link } from "react-router-dom";

const Forms = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    async function request() {
      try {
        const res = await fetch.POST("/api/login", {
          username: data.username,
          password: data.password,
        });
        const parserDataJson = await res.json();
        if (parserDataJson.success === false) {
          throw parserDataJson;
        } else {
          localStorage.setItem(
            "access_token",
            parserDataJson.access_token || null
          );
          props.history.push("/admin/console");
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
                <CardTitle tag="h4">Login Page | MQTT Console Broker</CardTitle>
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
                  <Button color="primary" onClick={onLogin} type="submit">
                    LOGIN
                  </Button>

                  <div>
                    <Link to="/register"><p>REGISTER?</p></Link>
                  </div>
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

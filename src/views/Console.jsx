import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from "reactstrap";
import io from "socket.io-client";

const Console = (props) => {
  const [data, setData] = useState({
    topicName: "",
    message: "",
  });

  const [socketData, setSocketData] = useState([]);

  const onPublish = (e) => {
    e.preventDefault();
    console.log(data, socketData);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token") || null;
    const socket = io("http://localhost:3001", {
      query: {
        token,
      },
    });
    socket.on("subscribe", (dataRe) => {
      setSocketData((socketData) => [...socketData, {
          key: "Subcribe Topic",
          value: dataRe
      }]);
      console.log(dataRe);
      return;
    });

    socket.on("message", (dataRe) => {
      setSocketData((socketData) => [...socketData, {
          key: dataRe.topic,
          value: dataRe.payload
      }]);
      console.log(dataRe);
      return;
    });
  }, []);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <Form>
                      <FormGroup>
                        <Label>Publisher - Topic</Label>
                        <Input
                          value={data.topicName}
                          placeholder="Topic name"
                          onChange={(e) =>
                            setData({ ...data, topicName: e.target.value })
                          }
                        />
                        <Label>Publisher - Message</Label>
                        <Input
                          value={data.message}
                          placeholder="Message string"
                          onChange={(e) =>
                            setData({ ...data, message: e.target.value })
                          }
                        />
                      </FormGroup>
                      <Button onClick={onPublish}>Publish</Button>
                    </Form>
                  </Col>
                  <Col xs="8">
                    <Label>Message Subcriber</Label>
                    {socketData.map((elem, index) => {
                        return(
                            <p key={index} style={{color: "#555"}}>{elem.key} - {elem.value}</p>
                        )
                    })}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Console;

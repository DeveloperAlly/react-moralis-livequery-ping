import React from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Layout from "./Layout";
import { Header, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
        }}
      >
        <Header as="h2" style={{ paddingTop: "40px" }}>
          Sorry - an error occurred!
        </Header>
        <Button
          style={{ backgroundColor: "#B7E803", color: "white" }}
          icon
          size="large"
          onClick={() => router.push("/")}
        >
          {"Home    "}
          <Icon name="home" />
        </Button>
        <p style={{ padding: "40px" }}>Try again or just enjoy this video!</p>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          // playing={true}
          // muted={true}
          controls={true}
        />
      </div>
    </Layout>
  );
};

export default ErrorPage;

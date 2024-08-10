// src/pages/Home.tsx

import { useContext } from "react";
import Navigation from "../components/Navigation";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";
import UploadDocument from "../components/DocumentUpload";
import DocumentList from "../components/DocumentList";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navigation />
      <Layout>
        <p style={{ marginTop: "2rem" }}>Welcome back {user?.name} 👋</p>
        <UploadDocument />
        <DocumentList />
      </Layout>
    </>
  );
};

export default Home;

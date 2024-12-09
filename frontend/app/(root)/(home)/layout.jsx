import React from "react";
import Navbar from "../../../components/shared/navbar/navbar";
import TalkUs from "../../../components/shared/footer/TalkToUs";
import Footer from "../../../components/shared/footer/Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <TalkUs />
      <Footer />
    </>
  );
};

export default HomeLayout;

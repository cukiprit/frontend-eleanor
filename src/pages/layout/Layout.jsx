import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Box, Container } from "@chakra-ui/react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AdminNavbar from "../../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <Flex h="100vh" direction="column">
      <Box flex={1} overflowY="auto">
        <AdminNavbar />

        <Box padding={5}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;

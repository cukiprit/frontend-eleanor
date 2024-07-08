import {
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useState } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const nav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Flex bg="#153448" w="100%" p={4} color="white" align="center">
      <Heading size="lg">Eleanor</Heading>
      <Spacer />
      {nav.map((navigation) => (
        <Link
          as={ReactRouterLink}
          key={navigation.name}
          px={2}
          mr={2}
          to={navigation.path}
        >
          {navigation.name}
        </Link>
      ))}
      {isLoggedIn ? (
        <>
          <Link as={ReactRouterLink} px={2} mr={2} to="/admin">
            Admin
          </Link>
          <Button bgColor="white" variant="outline" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <Button bgColor="white" variant="outline" onClick={onOpen}>
          Login
        </Button>
      )}

      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Navbar;

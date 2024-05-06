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

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex bg="#153448" w="100%" p={4} color="white" align="center">
      <Heading size="lg">Eleanor</Heading>
      <Spacer />
      <Link as={ReactRouterLink} px={2} mr={2} to="/">
        Home
      </Link>
      <Link as={ReactRouterLink} px={2} mr={2} to="/products">
        Products
      </Link>
      <Button bgColor="white" variant="outline" onClick={onOpen}>
        Login
      </Button>

      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Navbar;

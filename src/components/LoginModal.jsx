import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const loginSubmit = (event) => {
    event.preventDefault();

    const username = formRef.current.elements.username.value;
    const password = formRef.current.elements.password.value;

    fetch("https://backend-eleanor.vercel.app/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          toast({
            title: "Login Success",
            description: "Login successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          onClose();
          navigate("/admin");
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) => {
        toast({
          title: "Login Failed",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form ref={formRef} onSubmit={loginSubmit}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" type="text" name="username" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" name="password" />
            </FormControl>

            <FormControl mt={4}>
              <Button
                w="100%"
                bg="#153448"
                color="white"
                _hover={{ bg: "teal" }}
                type="submit"
              >
                Login
              </Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

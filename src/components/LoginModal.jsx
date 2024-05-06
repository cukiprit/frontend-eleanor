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
} from "@chakra-ui/react";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" type="password" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;

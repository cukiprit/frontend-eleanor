import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Heading,
} from "@chakra-ui/react";

const DetailProduct = ({ isOpen, onClose, product }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detail Produk</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Heading>{product.product_name}</Heading>

          <Text>{product.product_description}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailProduct;

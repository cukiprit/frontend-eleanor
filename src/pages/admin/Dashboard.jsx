import {
  Heading,
  Box,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Button,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    fetch(
      `https://backend-eleanor.vercel.app/api/products?page=${page}&pageSize=${pageSize}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 5));
      })
      .catch((err) => console.error(err.message));
  }, [page]);

  const handleDeleteClick = (id) => {
    setProductIdToDelete(id);
    onOpen();
  };

  const handleDeleteConfirm = () => {
    const token = localStorage.getItem("token");

    fetch(
      `https://backend-eleanor.vercel.app/api/products/${productIdToDelete}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product.id_product !== productIdToDelete
          )
        );

        toast({
          title: "Success",
          description: "Product deleted successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      });
  };

  return (
    <Flex flexDir="column">
      <Heading>Dashboard</Heading>

      <TableContainer mt={5}>
        <Table>
          <Thead>
            <Tr>
              <Th>Nama Produk</Th>
              <Th textAlign="center">Harga Produk</Th>
              <Th textAlign="center">Stok Produk</Th>
              <Th textAlign="center">Detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((data) => (
              <>
                <Tr key={data.id_product}>
                  <Td>{data.product_name}</Td>
                  <Td textAlign="center">{data.product_price}</Td>
                  <Td textAlign="center">{data.product_stock}</Td>
                  <Td>
                    <Flex alignItems="center" justifyContent="center">
                      <Button
                        as={ReactRouterLink}
                        to={`product/${data.id_product}`}
                        colorScheme="yellow"
                        textColor="white"
                        mr={3}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(data.id_product)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Box>
        <Pagination
          currentPage={page}
          totalPage={totalPages}
          onPageChange={(nextPage) => setPage(nextPage)}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah Anda yakin ingin menghapus data ini?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tidak
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={handleDeleteConfirm}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Dashboard;

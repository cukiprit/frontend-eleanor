import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";

const AddProducts = () => {
  const formRef = useRef();
  const toast = useToast();

  const uploadData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        toast({
          title: "Success",
          description: "Data added successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Box w="100%">
      <Heading as="h1">Add a Product</Heading>

      <form ref={formRef} onSubmit={uploadData} encType="multipart/form-data">
        <FormControl mt={5}>
          <Box>
            <FormLabel>Nama Produk</FormLabel>
            <Input type="text" name="product_name" />
          </Box>
        </FormControl>

        <HStack mt={5}>
          <FormControl>
            <FormLabel>Harga Produk</FormLabel>
            <InputGroup>
              <InputLeftAddon>Rp</InputLeftAddon>
              <NumberInput>
                <NumberInputField name="product_price" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Stok Produk</FormLabel>
            <NumberInput>
              <NumberInputField name="product_stock" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>

        <FormControl mt={5}>
          <FormLabel>Deskripsi Produk</FormLabel>
          <Textarea
            placeholder="Jelaskan deskripsi produk"
            size="md"
            name="product_description"
          />
        </FormControl>

        <FormControl mt={5}>
          <FormLabel>Product Image</FormLabel>
          <Input type="file" name="product_image" />
        </FormControl>

        <FormControl mt={5}>
          <Button type="submit">Upload</Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddProducts;

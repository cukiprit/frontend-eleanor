import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
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
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const toast = useToast();
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name: "",
    product_price: 0,
    product_stock: 0,
    product_description: "",
    product_image: "",
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handlePriceChange = (valueString) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_price: parseFloat(valueString) || 0,
    }));
  };

  const handleStockChange = (valueString) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_stock: parseInt(valueString) || 0,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct((prevProduct) => ({
        ...prevProduct,
        product_image: imageUrl,
      }));
    }
  };

  const uploadData = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const token = localStorage.getItem("token");

    fetch(
      `https://backend-eleanor-lnnsui6v9-karminemcukipritgmailcoms-projects.vercel.app/api/products/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
          description: "Data updated successfully",
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

  useEffect(() => {
    fetch(`https://backend-eleanor.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const productData = data.product[0];
        setProduct({
          id_product: productData.id_product || "",
          product_name: productData.product_name || "",
          product_price: parseFloat(productData.product_price) || 0,
          product_stock: parseInt(productData.product_stock) || 0,
          product_description: productData.product_description || "",
          product_image: productData.product_image || "",
        });
      })
      .catch((err) => console.error(err.message));
  }, [id]);

  return (
    <Box w="100%">
      <Heading as="h1">Edit Product</Heading>

      <Button w={100} my={5} onClick={handleBack}>
        Back
      </Button>

      {product.product_image && (
        <Image src={product.product_image} alt={product.product_name} />
      )}
      <FormControl mt={5}>
        <Box>
          <FormLabel>ID Produk</FormLabel>
          <Input
            type="text"
            name="id_product"
            disabled
            value={product.id_product}
            onChange={handleChange}
          />
        </Box>
      </FormControl>

      <form ref={formRef} onSubmit={uploadData} encType="multipart/form-data">
        <FormControl mt={5}>
          <Box>
            <FormLabel>Nama Produk</FormLabel>
            <Input
              type="text"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
            />
          </Box>
        </FormControl>

        <HStack mt={5}>
          <FormControl>
            <FormLabel>Harga Produk</FormLabel>
            <InputGroup>
              <InputLeftAddon>Rp</InputLeftAddon>
              <NumberInput
                w="100%"
                value={parseFloat(product.product_price)}
                onChange={handlePriceChange}
              >
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
            <NumberInput
              value={parseInt(product.product_stock)}
              onChange={handleStockChange}
            >
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
            value={product.product_description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={5}>
          <FormLabel>Product Image</FormLabel>
          <Input
            type="file"
            name="product_image"
            onChange={handleImageChange}
          />
        </FormControl>

        <FormControl mt={5}>
          <Button type="submit" colorScheme="green">
            Update
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default DetailProduct;

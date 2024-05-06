import { Box, Button, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product[0]))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <Container maxW="container.md" mb={5}>
      <Button w={100} as={ReactRouterLink} to="/products" my={5}>
        Back
      </Button>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
        <Image src={product.product_image} alt={product.product_name} />

        <Box mt={5}>
          <Heading>{product.product_name}</Heading>

          <Text>Price: {product.product_price}</Text>
          <Text>Stock: {product.product_stock}</Text>
          <Text>Description: {product.product_description}</Text>
        </Box>
      </Box>
    </Container>
  );
};

export default Details;

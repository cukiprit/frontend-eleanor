import { Box, Button, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link as ReactRouterLink } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    fetch(`https://backend-eleanor.vercel.app/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product[0]);
        setProductImage(JSON.parse(product.product_image).url);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <Container maxW="container.md" mb={5}>
      <Button w={100} as={ReactRouterLink} to="/products" my={5}>
        Back
      </Button>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
        <Image src={productImage} alt={product.product_name} />

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

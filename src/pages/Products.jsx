import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://backend-eleanor.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <Container maxW="container.xl">
      <Heading textAlign="center" my={5}>
        Products
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} px={10}>
        {products.map((product) => (
          <ProductCard
            key={product.id_product}
            product={{
              ...product,
              product_image: JSON.parse(product.product_image),
            }}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;

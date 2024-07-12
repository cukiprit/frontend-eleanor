import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  // setProducts(data.products);
  useEffect(() => {
    fetch("https://backend-eleanor.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        const processedProducts = data.products.map((product) => {
          try {
            const parsedImage = JSON.parse(product.product_image);
            return {
              ...product,
              product_image: parsedImage,
            };
          } catch (e) {
            console.error(
              `Failed to parse product_image for product ${product.id_product}:`,
              product.product_image
            );
            return product; // Return the product without parsing if there's an error
          }
        });
        console.log(processedProducts);
        setProducts(processedProducts);
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
          <ProductCard key={product.id_product} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;

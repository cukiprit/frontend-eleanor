import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
        src={product.product_image.url}
        alt={product.product_name.filename}
      />

      <Box p={6}>
        <Box display="flex" alignItems="baseline">
          <Text mt={1} fontWeight="semibold" as="h4" lineHeight="tight">
            {product.product_name}
          </Text>
        </Box>

        <Box>
          {product.product_price}
          <Box as="span" color="gray.600" fontSize="sm">
            / unit
          </Box>
        </Box>

        <Button
          as={ReactRouterLink}
          to={`/products/${product.id_product}`}
          variant="outline"
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;

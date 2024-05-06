import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Box
      bgImage="url(https://wallpapers.com/images/hd/farm-desktop-8iqywvy4ap9mwvum.jpg)"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="100%"
      h="80vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      p={5}
      color="white"
      textAlign="center"
    >
      <VStack spacing={5} maxW="60%">
        <Heading>Fresh Farm Products</Heading>
        <Text>
          Experience the best quality farm products delivered to your doorstep.
          Our products are grown with care and dedication by local farmers. We
          believe in providing fresh, healthy, and tasty food for everyone. Join
          us in promoting sustainable farming practices for a healthier planet.
        </Text>
        <Button
          colorScheme="#153448"
          variant="outline"
          as={ReactRouterLink}
          to="/products"
        >
          Shop now
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;

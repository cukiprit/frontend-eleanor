import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  LuAlignJustify,
  LuX,
  LuLayoutDashboard,
  LuBookPlus,
  LuLogOut,
} from "react-icons/lu";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const nav = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LuLayoutDashboard,
    },
    {
      name: "Add Product",
      path: "/admin/add-product",
      icon: LuBookPlus,
    },
  ];

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        padding={5}
        backgroundColor="#153448"
        color="white"
      >
        <Heading fontSize="xx-large">Admin Pages</Heading>

        <IconButton
          ref={btnRef}
          icon={isOpen ? <LuX size={24} /> : <LuAlignJustify size={24} />}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="whiteAlpha"
          aria-label="Toggle Navigation"
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {nav.map((navigation) => (
                <Link
                  as={ReactRouterLink}
                  key={navigation.name}
                  _hover={{ bg: "gray.200", color: "#153448" }}
                  p={2}
                  borderRadius={5}
                  to={navigation.path}
                  onClick={onClose}
                >
                  <Flex alignItems="center">
                    <Icon as={navigation.icon} mr={3} w={5} h={5} />
                    <Text>{navigation.name}</Text>
                  </Flex>
                </Link>
              ))}
              <Flex p={2} alignItems="center" onClick={logout}>
                <Icon as={LuLogOut} mr={3} w={5} h={5} />
                <Text>Logout</Text>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminNavbar;

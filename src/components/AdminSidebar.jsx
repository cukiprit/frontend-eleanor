import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import {
  LuAlignJustify,
  LuLayoutDashboard,
  LuBookPlus,
  LuLogOut,
  LuX,
} from "react-icons/lu";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const toggleSidebar = () => setOpen(!open);
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
    <VStack
      spacing={10}
      align="stretch"
      padding={5}
      backgroundColor="#153448"
      color="white"
      height="100vh"
      width={isLargerThan800 ? (open ? "20%" : "10%") : "20%"}
    >
      <Heading
        as="h1"
        textAlign="center"
        size={isLargerThan800 ? (open ? "lg" : "md") : "sm"}
      >
        Eleanor
      </Heading>
      <Flex alignItems="center" justifyContent="center">
        <IconButton
          aria-label="Menu"
          variant="ghost"
          justifyContent="center"
          color="white"
          width="20%"
          _hover={{ bg: "white", color: "#153448" }}
          icon={open ? <LuX size={20} /> : <LuAlignJustify size={20} />}
          onClick={toggleSidebar}
        />
      </Flex>
      {nav.map((navigation) => (
        <Link
          key={navigation.name}
          as={ReactRouterLink}
          _hover={{ bg: "white", color: "#153448" }}
          p={5}
          borderRadius={5}
          to={navigation.path}
        >
          <Flex
            alignItems="center"
            justifyContent={open ? "flex-start" : "center"}
          >
            <Icon as={navigation.icon} mr={open ? 3 : 0} w={5} h={5} />{" "}
            <Text fontWeight="bold">{open && navigation.name}</Text>
          </Flex>
        </Link>
      ))}
      <IconButton icon={<LuLogOut />} onClick={logout} />
    </VStack>
  );
};

export default AdminSidebar;

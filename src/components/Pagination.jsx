import { Box, Button } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  return (
    <Box display="flex" justifyContent="center" padding={10}>
      <Button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Box paddingX={10}>
        Page {currentPage} of {totalPage}
      </Box>
      <Button
        onClick={() => {
          if (currentPage < totalPage) onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPage}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;

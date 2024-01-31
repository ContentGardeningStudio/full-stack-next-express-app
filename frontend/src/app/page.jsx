import { Box, Typography } from "@mui/material";

import TopBooks from "@/components/home/TopBooks";
import Books from "@/components/home/Books";

export default function Home() {
  return (
    <>
      <Box className="container" sx={{ pt: 6 }}>
        <Typography
          className="container"
          component="h1"
          variant="h3"
          sx={{ textAlign: "center" }}
        >
          The Greatest Books of All Time
        </Typography>
      </Box>
      <TopBooks />
      <Box className="container" sx={{ pt: 10 }}>
        <Typography
          className="container"
          component="h1"
          variant="h3"
          sx={{ mb: 4, textAlign: "center" }}
        >
          All books
        </Typography>
        <Books />
      </Box>
    </>
  );
}

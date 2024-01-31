"use client";

import { useGetTopBooksQuery } from "@/redux/features/publicApiSlice";
import { Box, Typography } from "@mui/material";

import TopBooksCanvas from "@/components/canvas/TopBooks";
import Alert from "@mui/material/Alert";

export default function TopBooks() {
  const { data, isError } = useGetTopBooksQuery();

  if (isError) {
    return (
      <Box display="flex" justifyContent="center">
        <Alert severity="error" sx={{ mt: 6 }}>
          Soory, could not get top rated books!
        </Alert>
      </Box>
    );
  }

  if (data) {
    if (data.length === 0) {
      return (
        <Box display="flex" justifyContent="center">
          <Typography
            className="container"
            component="p"
            variant="h5"
            sx={{ mt: 4, textAlign: "center" }}
          >
            No book found!
          </Typography>
        </Box>
      );
    }

    return <TopBooksCanvas data={data} />;
  }

  return null;
}

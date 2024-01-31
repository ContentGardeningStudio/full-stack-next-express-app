"use client";

import { useGetBooksQuery } from "@/redux/features/publicApiSlice";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import Alert from "@mui/material/Alert";

export default function Books() {
  const { data, isError } = useGetBooksQuery();

  console.log("all books :", data);

  if (isError) {
    return (
      <Box display="flex" justifyContent="center">
        <Alert severity="error" sx={{ mt: 6 }}>
          Soory, could not get books!
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

    return (
      <Box>
        <ImageList variant="masonry" cols={4} gap={16}>
          {data.map((item, i) => (
            <ImageListItem key={i}>
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
              <ImageListItemBar title={item.title} subtitle={item.author} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );
  }

  return null;
}

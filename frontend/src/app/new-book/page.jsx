"use client";

import { useState } from "react";
import Image from "next/image";
import libraryImg from "../../../public/images/library.jpg";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NewBookForm from "@/src/components/forms/NewBookForm";

export default function SignIn() {
  const [created, setCreated] = useState(false);

  return (
    <Container
      component="main"
      maxWidth={created ? "sm" : "xs"}
      sx={{ py: "64px" }}
    >
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {created ? (
          <>
            <Typography component="h1" variant="h4">
              Thank you!
            </Typography>
            <Typography component="p" variant="subtitle">
              your book has been published
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 450,
                maxWidth: 450,
                maxHeight: 450,
                my: 4,
              }}
            >
              <Image fill src={libraryImg} />
            </Box>
            <Button href="/">Back to Home</Button>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h4">
              Add a book
            </Typography>
            <Box sx={{ mt: 1 }}>
              <NewBookForm onValidate={() => setCreated(true)} />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

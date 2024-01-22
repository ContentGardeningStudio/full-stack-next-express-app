"use client";

import {
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirm_password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?books)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="email_field"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
            />
            <TextField
              required
              fullWidth
              margin="normal"
              type="password"
              id="confirm_password"
              name="confirm_password"
              label="Confirm Password"
              autoComplete="off"
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ my: 3 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

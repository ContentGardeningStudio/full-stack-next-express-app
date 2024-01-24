import { useState } from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function CustomPasswordField({ name, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const config = {
    fullWidth: true,
    id: `field_${name}`,
    type: showPassword ? "text" : "password",
    variant: "filled",
    ...field,
    ...props,
  };

  if (meta.error) {
    config.error = true;
  }
  if (meta.touched && meta.error) {
    config.helperText = meta.error;
  }

  return (
    <TextField
      {...config}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

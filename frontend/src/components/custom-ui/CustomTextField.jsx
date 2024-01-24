import { useField } from "formik";
import TextField from "@mui/material/TextField";

export default function CustomTextField({ name, type, ...props }) {
  const [field, meta] = useField(name);

  const config = {
    fullWidth: true,
    id: `field_${name}`,
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

  if (type == "number") {
    config.inputProps = {
      inputMode: "decimal",
    };
  } else {
    config.type = type;
  }

  return <TextField {...config} />;
}

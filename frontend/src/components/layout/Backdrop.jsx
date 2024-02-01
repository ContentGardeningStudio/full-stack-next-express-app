import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop({ open }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 99 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

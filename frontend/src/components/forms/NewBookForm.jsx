import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import { useAddBookMutation } from "@/redux/features/privateApiSlice";
import { getFromLocalStorage } from "@/src/lib/common";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { yupErrors } from "@/src/data/constants";
import * as yup from "yup";

import CustomTextField from "@/components/custom-ui/CustomTextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function NewBookForm({ onValidate }) {
  const [rating, setRating] = useState(null);
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [addBook] = useAddBookMutation();

  const initialValues = {
    title: "",
    author: "",
    year: "",
    genre: "",
  };

  // Schema validation
  yup.setLocale(yupErrors);
  const validationSchema = yup.object({
    title: yup.string().required(),
    author: yup.string().required(),
    year: yup.number().required(),
    genre: yup.string().required(),
  });

  // reintiliez server errors
  const resetServerErrors = () => {
    setServerErrors(null);
  };

  // handle submit
  const onSubmit = (values, bag) => {
    const userId = getFromLocalStorage("userId");

    const book = {
      userId,
      title: values.title,
      author: values.author,
      year: values.year,
      genre: values.genre,
      ratings: [
        {
          userId,
          grade: rating ? parseInt(rating, 10) : 0,
        },
      ],
      averageRating: parseInt(rating, 10),
    };

    const bodyFormData = new FormData();
    bodyFormData.append("book", JSON.stringify(book));
    bodyFormData.append("image", file);

    addBook(bodyFormData)
      .unwrap()
      .then(() => {
        // show success notification
        toast.success("Book added with success.");

        onValidate();
      })
      .catch((error) => {
        let errorMsg = "Somthings went wrong !";

        if (error.status != "FETCH_ERROR") {
          errorMsg = error.data.message;
        }

        // show error notification
        setServerErrors(errorMsg);
        toast.error(errorMsg);
      });

    // Set isSubmitting to false (to finish the cycle)
    bag.setSubmitting(false);
  };

  useEffect(() => {
    if (file) {
      const newUrl = URL.createObjectURL(file);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file?.name]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <CustomTextField
            label="Book title"
            name="title"
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <CustomTextField
            label="Author"
            name="author"
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <CustomTextField
            type="number"
            label="Year of publication "
            name="year"
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <CustomTextField
            label="Genre"
            name="genre"
            variant="outlined"
            sx={{ mt: 3 }}
          />
          <Box sx={{ mt: 3 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              size="large"
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              sx={{ mt: 1 }}
            />
          </Box>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 3 }}
          >
            {imgSrc && (
              <Box sx={{ maxWidth: 120, maxHeight: 120 }}>
                <img
                  src={imgSrc}
                  alt="new book image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                  }}
                ></img>
              </Box>
            )}
            <Button
              component="label"
              variant="contained"
              startIcon={<ImageOutlinedIcon />}
            >
              {imgSrc ? "Edit image" : "Upload image"}
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
          </Stack>
          {serverErrors && (
            <Alert severity="error" sx={{ mt: 3, mb: 2 }}>
              {serverErrors}
            </Alert>
          )}
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!formik.isValid || file === null || formik.isSubmitting}
          >
            Publish
          </Button>
          <ReintializeServerError onChangeValues={resetServerErrors} />
        </Form>
      )}
    </Formik>
  );
}

function ReintializeServerError({ onChangeValues }) {
  const { values } = useFormikContext();

  useEffect(() => {
    onChangeValues();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null;
}

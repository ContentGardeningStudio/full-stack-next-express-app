import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, useFormikContext } from "formik";
import { useSignUpMutation } from "@/redux/features/publicApiSlice";
import { toast } from "react-toastify";

import * as yup from "yup";

import CustomTextField from "@/components/custom-ui/CustomTextField";
import CustomPasswordField from "@/components/custom-ui/CustomPasswordField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function RegisterForm() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState(null);
  const initialValues = {
    email: "",
    password: "",
    re_password: "",
  };

  // Schema validation
  const validationSchema = yup.object({
    email: yup.string().email().lowercase().required(),
    password: yup.string().min(6).required(),
    re_password: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password does not match the confirmation"
      )
      .required("Confirm password is required"),
  });

  const [register] = useSignUpMutation();

  // reintiliez server errors
  const resetServerErrors = () => {
    setServerErrors(null);
  };

  // handle submit
  const onSubmit = (values, bag) => {
    const { email, password } = values;

    register({ email, password })
      .unwrap()
      .then(() => {
        // show register success notification
        toast.success("Congratulations! your account has been created.");

        // redirect user login page
        router.push("/sign-in");
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <CustomTextField
            label="Email Address"
            name="email"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <CustomPasswordField
            label="Password"
            name="password"
            variant="outlined"
            sx={{ mt: 2 }}
          />
          <CustomPasswordField
            label="Confirm password"
            name="re_password"
            variant="outlined"
            sx={{ mt: 2 }}
          />
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
            sx={{ my: 3 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
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

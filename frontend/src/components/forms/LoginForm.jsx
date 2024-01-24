import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, useFormikContext } from "formik";
import { useSignInMutation } from "@/redux/features/publicApiSlice";
import { toast } from "react-toastify";

import * as yup from "yup";

import CustomTextField from "@/components/custom-ui/CustomTextField";
import CustomPasswordField from "@/components/custom-ui/CustomPasswordField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { storeInLocalStorage } from "@/src/lib/common";

export default function LoginForm() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState(null);
  const initialValues = {
    email: "",
    password: "",
  };

  // Schema validation
  const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const [login] = useSignInMutation();

  // reintiliez server errors
  const resetServerErrors = () => {
    setServerErrors(null);
  };

  // handle submit
  const onSubmit = (values, bag) => {
    const { email, password } = values;

    login({ email, password })
      .unwrap()
      .then((res) => {
        // show login success notification
        toast.success("Welcome back! We're glad to see you again.");

        // store user and token
        storeInLocalStorage(res.token, res.userId);

        // redirect user to home page
        router.push("/");
      })
      .catch((error) => {
        const errorMsg = error.data.message || "Somthings went wrong !";

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
            Sign In
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

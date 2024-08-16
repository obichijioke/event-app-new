"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginWithGoogle, loginWithGitHub } from "../../appwrite";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    await login(values.email, values.password);
    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-4 space-y-2">
        <button
          onClick={loginWithGoogle}
          className="w-full p-2 bg-red-500 text-white rounded"
        >
          Log in with Google
        </button>
        <button
          onClick={loginWithGitHub}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          Log in with GitHub
        </button>
      </div>
    </div>
  );
}

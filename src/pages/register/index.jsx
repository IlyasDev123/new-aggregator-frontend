import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Card from 'shared/components/card';
import InputField from 'shared/components/form/inputField';
import Button from 'shared/components/button';
import Label from 'shared/components/form/label';
import { Register } from 'shared/services/authService';
import { toastMessage } from 'shared/components/toast';
import { setUser } from 'shared/redux/reducers/userSlice';

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleRegister(values, setSubmitting);
    },
  });

  const handleRegister = (values, setSubmitting) => {
    setSubmitting(true);
    Register(values)
      .then(({ data: { data, message } }) => {
        let resp = {
          isLoggedIn: true,
          user: {
            name: data?.name,
            email: data?.email,
            id: data?.id,
          },
          token: data?.token,
          resetPassword: false,
        };
        dispatch(setUser(resp));
        toastMessage('success', message);
        navigate('/articles');
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card customClass="p-6 shadow rounded-2xl bg-white w-1/4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your details to proceed.
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <Label title="Name" />
              <InputField
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <div>
                <Label title="Email" />
                <InputField
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div>
              <Label title="Password" />
              <InputField
                type="password"
                placeholder="Enter your password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <Label title="Confirm Password" />
              <InputField
                type="password"
                placeholder="Enter your confirm password"
                id="password"
                name="password_confirmation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password_confirmation}
              />
              {formik.touched.password_confirmation &&
              formik.errors.password_confirmation ? (
                <div className="text-red-500">
                  {formik.errors.password_confirmation}
                </div>
              ) : null}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Processing...' : 'Register'}
              </Button>
            </div>
            <p className="text-center text-gray-600 pb-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Please login
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}

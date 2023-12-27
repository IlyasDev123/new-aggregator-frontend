import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'shared/components/button';
import Label from 'shared/components/form/label';
import Card from 'shared/components/card';
import Select from 'react-select';
import { setPreferences } from 'shared/services/userService';
import { toastMessage } from 'shared/components/toast';
import { setUser } from 'shared/redux/reducers/userSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const {
    categories,
    sources,
    authors,
    user: { preferences },
  } = useSelector((state) => state.root);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);
  };

  const handleSourceChange = (selectedOptions) => {
    setSelectedSources(selectedOptions || []);
  };

  const handleAuthorChange = (selectedOptions) => {
    setSelectedAuthors(selectedOptions || []);
  };

  useMemo(() => {
    setSelectedCategories(
      preferences?.categories?.map((category) => ({
        id: category.id,
        value: category.name,
        label: category.name,
      })) || []
    );
  }, [preferences]);

  useMemo(() => {
    setSelectedSources(
      preferences?.sources?.map((source) => ({
        id: source.id,
        value: source.name,
        label: source.name,
      })) || []
    );
  }, [preferences]);

  useMemo(() => {
    setSelectedAuthors(
      preferences?.authors?.map((author) => ({
        id: author.id,
        value: author.name,
        label: author.name,
      })) || []
    );
  }, [preferences]);

  const validationSchema = Yup.object().shape({
    selectedCategories: Yup.array().min(0, 'Select at least one category'),
    selectedSources: Yup.array().min(0, 'Select at least one source'),
    selectedAuthors: Yup.array().min(0, 'Select at least one author'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setPreferences(values)
      .then(({ data: { data, message } }) => {
        let resp = {
          preferences: {
            categories: data?.categories,
            sources: data?.sources,
            authors: data?.authors,
          },
        };
        dispatch(setUser(resp));
        toastMessage('success', message);
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Card customClass="bg-white rounded-lg" headerText="Preferences">
      <Formik
        initialValues={{
          selectedCategories: selectedCategories ?? [],
          selectedSources: selectedSources ?? [],
          selectedAuthors: selectedAuthors ?? [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="space-y-6 px-4" onSubmit={handleSubmit}>
            <div>
              <Label title="Categories" />
              <Select
                className="text-gray-900"
                value={values.selectedCategories}
                onChange={(selectedOptions) => {
                  setFieldValue('selectedCategories', selectedOptions || []);
                  handleCategoryChange(selectedOptions);
                }}
                options={categories?.map((category) => ({
                  id: category.id,
                  value: category.name,
                  label: category.name,
                }))}
                placeholder="Select Categories..."
                isMulti
                name="selectedCategories"
              />
              {touched.selectedCategories && errors.selectedCategories && (
                <div className="text-red-500">{errors.selectedCategories}</div>
              )}
            </div>
            <div>
              <Label title="Sources" />
              <Select
                className="text-gray-900"
                value={values.selectedSources}
                onChange={(selectedOptions) => {
                  setFieldValue('selectedSources', selectedOptions || []);
                  handleSourceChange(selectedOptions);
                }}
                options={sources?.map((source) => ({
                  id: source.id,
                  value: source.name,
                  label: source.name,
                }))}
                placeholder="Select Sources..."
                isMulti
                name="selectedSources"
              />
              {touched.selectedSources && errors.selectedSources && (
                <div className="text-red-500">{errors.selectedSources}</div>
              )}
            </div>
            <div>
              <Label title="Authors" />
              <Select
                className="text-gray-900"
                value={values.selectedAuthors}
                onChange={(selectedOptions) => {
                  setFieldValue('selectedAuthors', selectedOptions || []);
                  handleAuthorChange(selectedOptions);
                }}
                options={authors?.map((author) => ({
                  id: author.id,
                  value: author.name,
                  label: author.name,
                }))}
                placeholder="Select Author..."
                isMulti
                name="selectedAuthors"
              />
              {touched.selectedAuthors && errors.selectedAuthors && (
                <div className="text-red-500">{errors.selectedAuthors}</div>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Settings;

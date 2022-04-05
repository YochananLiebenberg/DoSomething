import React from "react";
import { useFormikContext } from "formik";

import TextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      {touched && <ErrorMessage error={errors[name]} />}
    </>
  );
}

export default AppFormField;

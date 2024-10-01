"use client";

import { useState } from "react";

function useGetFieldsValue(values) {
  const [formData, setFormData] = useState(values);

  const getValue = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return [formData, getValue, setFormData];
}
export default useGetFieldsValue;

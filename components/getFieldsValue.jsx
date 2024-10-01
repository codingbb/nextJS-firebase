"use client";

import { useState } from "react";

function GetFieldsValue(values) {
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
export default GetFieldsValue;

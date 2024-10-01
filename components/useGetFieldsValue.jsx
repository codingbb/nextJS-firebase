"use client";

import { useState } from "react";

// 입력값을 관리하기 위한 커스텀 훅
// formData (사용자가 입력한 값들)
// getValue (입력값이 바뀔 때마다 실행되는 함수)

function useGetFieldsValue(values) {
  const [formData, setFormData] = useState(values);

  const getValue = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    console.log("GetFieldsValue = ", name, value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("formData111 ", formData);
  return [formData, getValue];
  // return [formData, name, value];
}
export default useGetFieldsValue;

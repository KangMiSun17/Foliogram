// 이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
export const validateEmail = (email) => {
  const emailRule =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRule.test(email);
};

// 비밀번호가 8~20자리, 특수문자, 영문, 숫자가 포함되는지 확인함.
export const validatePassword = (password) => {
  const passwordRule =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  return passwordRule.test(password);
};

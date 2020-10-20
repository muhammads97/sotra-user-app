export const adjustPhone = (phone) => {
  if (phone.startsWith("+")) {
    return phone;
  } else if (phone.startsWith("2")) {
    return "+" + phone;
  } else if (phone.startsWith("0")) {
    return "+2" + phone;
  } else {
    return null;
  }
};

export const isValidPhoneNumber = (phone) => {
  return phone != null && phone.length == 13;
};

export const isValidVerificationCode = (code) => {
  return code.length == 4;
};

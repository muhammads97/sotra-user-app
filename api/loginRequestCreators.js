const root = "https://sotra-app.com/";
const api_version = "api/v2/";
const base = root + api_version;

export function loginRequest(phone) {
  return {
    url: `${base}auth/login/client`,
    type: "POST",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
      },
    },
    data: {
      phone: phone,
    },
  };
}

export function verificationRequest(phone, code) {
  return {
    url: `${base}auth/verify/client`,
    type: "POST",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
      },
    },
    data: {
      phone: phone,
      verification_code: code,
    },
  };
}

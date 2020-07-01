import * as endPoints from "../constants/endPoints";

export class LoginService {
  constructor() {}
  async login(phone) {
    return await fetch(endPoints.default.login.url, {
      method: endPoints.default.login.methods.post,
      headers: {
        Accept: endPoints.default.login.accept,
        "Content-Type": endPoints.default.login.contentType,
      },
      body: JSON.stringify({
        phone: phone,
      }),
    });
  }
  adjustPhone(phone) {
    if (phone.startsWith("+")) {
      return phone;
    } else if (phone.startsWith("2")) {
      return "+" + phone;
    } else if (phone.startsWith("0")) {
      return "+2" + phone;
    } else {
      return null;
    }
  }
  async verify(phone, code) {
    return await fetch(endPoints.default.verify.url, {
      method: endPoints.default.verify.methods.post,
      headers: {
        Accept: endPoints.default.verify.accept,
        "Content-Type": endPoints.default.verify.contentType,
      },
      body: JSON.stringify({
        phone: phone,
        verification_code: code,
      }),
    });
  }
  async submitUserName(username, token) {
    return await fetch(endPoints.default.client.url, {
      method: endPoints.default.client.methods.patch,
      headers: {
        Accept: endPoints.default.client.accept,
        "Content-Type": endPoints.default.client.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: username,
      }),
    });
  }
  async getUser(token) {
    return await fetch(endPoints.default.client.url, {
      method: endPoints.default.client.methods.get,
      headers: {
        Accept: endPoints.default.client.accept,
        "Content-Type": endPoints.default.client.contentType,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

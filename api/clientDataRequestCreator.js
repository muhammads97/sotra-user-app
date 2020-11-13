const root = "https://sotra-app.com/";
const api_version = "api/v2/";
const base = root + api_version;

export function updateNameRequest(token, name) {
  return {
    url: `${base}client`,
    type: "PATCH",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
    data: {
      name: name,
    },
  };
}

export function addReferralRequest(token, code) {
  return {
    url: `${base}clients/referrals`,
    type: "POST",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
    data: {
      referral_code: code,
    },
  };
}

export function updateUserDataRequest(token, data) {
  return {
    url: `${base}client`,
    type: "PATCH",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
    data,
  };
}
export function updateCallBeforeDeliveryRequest(token, callBeforeDelivery) {
  return {
    url: `${base}client`,
    type: "PATCH",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
    data: {
      call_before_delivery: callBeforeDelivery,
    },
  };
}

export function getClientRequest(token) {
  return {
    url: `${base}client`,
    type: "GET",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function getAddressesRequest(token) {
  return {
    url: `${base}addresses`,
    type: "GET",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function getAddressRequest(token, id) {
  return {
    url: `${base}addresses/${id}`,
    type: "GET",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function deleteAddressRequest(token, id) {
  return {
    url: `${base}addresses/${id}`,
    type: "DELETE",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function addAddressRequest(token, address) {
  return {
    url: `${base}addresses`,
    type: "POST",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
    data: {
      name: address.name,
      street: address.street,
      latitude: address.latitude,
      longitude: address.longitude,
      floor: address.floor,
      building_number: address.building_number,
      additional_directions: address.additional_directions,
      apt: address.apt,
    },
  };
}

export function getPricesRequest(token) {
  return {
    url: `${base}items`,
    type: "GET",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function getConfig(key) {
  return {
    url: `${base}settings?name=${key}`,
    type: "GET",
    options: {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "user-type": "client",
      },
    },
  };
}

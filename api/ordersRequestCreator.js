const root = "https://sotra-app.com/";
const api_version = "api/v2/";
const base = root + api_version;

export function placeOrderRequest(
  token,
  address_id,
  promocode,
  pay_with_wallet,
  time_slot_id,
  has_wedding_dress
) {
  return {
    url: `${base}orders`,
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
      address_id,
      promocode,
      pay_with_wallet,
      time_slot_id,
      has_wedding_dress,
    },
  };
}

export function getWaitingRequest(token) {
  return {
    url: `${base}orders?status=waiting`,
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
export function getPickingRequest(token) {
  return {
    url: `${base}orders?status=picking`,
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

export function getServingRequest(token) {
  return {
    url: `${base}orders?status=serving`,
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
export function getDeliveringRequest(token) {
  return {
    url: `${base}orders?status=delivering`,
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

export function getArchivedRequest(token, page, perPage) {
  return {
    url: `${base}orders?status=archived&page=${page}&per_page=${perPage}`,
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

export function getOrderItemsRequest(token, order_id) {
  return {
    url: `${base}orders/${order_id}/order_items`,
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

export function rateOrderRequest(token, order_id, rating) {
  return {
    url: `${base}orders/${order_id}/rate`,
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
      rating,
    },
  };
}

export function cancelPickupRequest(token, order_id) {
  return {
    url: `${base}orders/${order_id}/cancel`,
    type: "PATCH",
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

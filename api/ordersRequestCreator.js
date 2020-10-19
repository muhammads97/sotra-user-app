const root = "https://sotra-app.com/";
const api_version = "api/v1/";
const base = root + api_version;

export function placeOrderRequest(token, address_id) {
  return {
    url: `${base}pickup`,
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
    },
  };
}

export function getWaitingRequest(token) {
  return {
    url: `${base}pickups/status/waiting`,
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
    url: `${base}orders/picking`,
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
    url: `${base}orders/serving`,
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
    url: `${base}orders/delivering`,
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

export function getArchivedRequest(token) {
  return {
    url: `${base}orders/archived`,
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

export function cancelPickupRequest(token, pickup_id) {
  return {
    url: `${base}cancel_pickup/${pickup_id}`,
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

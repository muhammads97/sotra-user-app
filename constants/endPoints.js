const endPoints = {
  login: {
    url: "http://18.235.35.92/auth/login/client",
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  verify: {
    url: "http://18.235.35.92/auth/verify/client",
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  client: {
    url: "http://18.235.35.92/client",
    methods: {
      get: "GET",
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  addresses: {
    url: "http://18.235.35.92/addresses",
    methods: {
      get: "GET",
      post: "POST",
      delete: "DELETE",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  pickup: {
    url: "http://18.235.35.92/pickup",
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  locations: {
    url: "http://18.235.35.92/sotra/locations",
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  items: {
    url: "http://18.235.35.92/items",
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  pickups: {
    url: "http://18.235.35.92/pickups/status/waiting",
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  cancelPickup: {
    url: "http://18.235.35.92/cancel_pickup",
    methods: {
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  orders: {
    url: "http://18.235.35.92/orders",
    methods: {
      get: "GET",
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  cancelPickup: {
    url: "http://18.235.35.92/cancel_pickup",
    methods: {
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  services: {
    url: "http://18.235.35.92/services",
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
};

export default endPoints;

const root = "http://18.235.35.92/";
const api_version = "api/v1/";
const base = root + api_version;
const endPoints = {
  login: {
    url: `${base}auth/login/client`,
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  verify: {
    url: `${base}auth/verify/client`,
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  client: {
    url: `${base}client`,
    methods: {
      get: "GET",
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  addresses: {
    url: `${base}addresses`,
    methods: {
      get: "GET",
      post: "POST",
      delete: "DELETE",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  pickup: {
    url: `${base}pickup`,
    methods: {
      post: "POST",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  locations: {
    url: `${base}sotra/locations`,
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  items: {
    url: `${base}items`,
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  pickups: {
    url: `${base}pickups/status/waiting`,
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  cancelPickup: {
    url: `${base}cancel_pickup`,
    methods: {
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  orders: {
    url: `${base}orders`,
    methods: {
      get: "GET",
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  cancelPickup: {
    url: `${base}cancel_pickup`,
    methods: {
      patch: "PATCH",
    },
    accept: "*/*",
    contentType: "application/json",
  },
  services: {
    url: `${base}services`,
    methods: {
      get: "GET",
    },
    accept: "*/*",
    contentType: "application/json",
  },
};

export default endPoints;

// export const BASE_URL =
//   location.hostname === "localhost" ? "http://localhost:7777" : "/api";


  export const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:7777"
    : "/api";
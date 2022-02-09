import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjc5MjM1MWJhYmQ5MWFhN2I1MDdhNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0Mzc2NzY2NywiZXhwIjoxNjQ0MDI2ODY3fQ.dcNXk6GfwUY6PsjMXHvw2JWirIftQb3wRPc30H3HJ4c";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

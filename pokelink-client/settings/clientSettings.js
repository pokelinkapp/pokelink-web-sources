import { getParam } from "../utils";

export default {
  currentUser: getParam("user") || "",
  server: getParam("server") || "http://localhost",
  port: getParam("port") || 3000,
};

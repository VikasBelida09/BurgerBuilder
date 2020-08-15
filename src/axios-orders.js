import axios from "axios";
const instance = axios.create({
  baseURL: "https://burger-builder-a2cf0.firebaseio.com/",
});
export default instance;

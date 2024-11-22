import App from "./components/App";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("app");
  const app = App(rootElement);
});

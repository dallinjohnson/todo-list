import App from "./components/NewApp";
import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("app");
  const app = App(rootElement);
});

import { Task } from "./classes/Task";
import { App } from "./components/App";
import "./styles.css";

const tasks = [
  new Task(1, "Walk the dog", new Date(2024, 8, 10), "High", "Duck Pond", null),
  new Task(
    2,
    "Wash car",
    new Date(2024, 8, 11),
    "Low",
    null,
    "Remember to vacuum"
  ),
  new Task(
    3,
    "Trail run",
    new Date(2024, 8, 15),
    "Low",
    "Jordan River Trail",
    null
  ),
];

document.addEventListener("DOMContentLoaded", () => {
  new App(tasks);
});

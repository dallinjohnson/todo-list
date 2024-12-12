import pubsub from "../pubsub/PubSub";
import { ProjectList } from "./ProjectList";
import SortDropdown from "./SortDropdown";
import ViewHeader from "./ViewHeader";
import SortingCriteria from "../enums/SortingCriteria";
import ListHeader from "./ListHeader";
import { Project } from "../classes/Project";
import ProjectService from "../services/ProjectService";
import ProjectListType from "../enums/ProjectListType";

const ProjectView = () => {
  let element;
  let sortDropdown;
  let selectedProject;

  const init = () => {
    element = createElement();
    pubsub.subscribe("numberOfTasksChanged", render);
    pubsub.subscribe("taskCheckboxClicked", render);
    pubsub.subscribe("projectSelected", (project) => {
      selectedProject = project;
    });
    if (!selectedProject) {
      selectedProject = ProjectService.findById(1);
    }
    pubsub.publish("projectSelected", selectedProject);
  };

  const createElement = () => {
    const viewHeader = createViewHeader();
    const defaultProjectList = createDefaultProjectList();
    const activeProjectList = createActiveProjectList();
    const completedProjectList = createCompletedProjectList();

    const div = document.createElement("div");
    div.classList.add("flex-column-10px-gap");
    div.appendChild(viewHeader.getElement());
    div.appendChild(defaultProjectList.getElement());
    div.appendChild(activeProjectList.getElement());
    div.appendChild(completedProjectList.getElement());

    return div;
  };

  const createViewHeader = () => {
    sortDropdown = createSortDropdown();
    return ViewHeader("Projects", sortDropdown.getElement());
  };

  const createSortDropdown = () => {
    const options = [
      {
        value: SortingCriteria.TITLE,
        textContent: "Title",
        selected: true,
      },
    ];
    const sortDropdown = SortDropdown(
      options,
      "project-sort-select",
      "sort-projects"
    );
    return sortDropdown;
  };

  const createDefaultProjectList = () => {
    const projectList = ProjectList(null, ProjectListType.DEFAULT);
    return projectList;
  };

  const createActiveProjectList = () => {
    const projectListHeader = ListHeader(
      "In Progress",
      "+ New Project",
      createNewProject
    );
    const projectList = ProjectList(
      projectListHeader.getElement(),
      ProjectListType.ACTIVE
    );
    return projectList;
  };

  const createCompletedProjectList = () => {
    const projectListHeader = ListHeader("Completed");
    const projectList = ProjectList(
      projectListHeader.getElement(),
      ProjectListType.COMPLETED
    );
    return projectList;
  };

  const createNewProject = () => {
    const project = new Project(null, null);
    const savedProject = ProjectService.insert(project);
    pubsub.publish("newProjectAdded", savedProject);
  };

  const render = () => {
    element.innerHTML = "";
    element.append(...createElement().childNodes);
    if (!selectedProject) {
      selectedProject = ProjectService.findById(1);
    }
    pubsub.publish("projectSelected", selectedProject);
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ProjectView;

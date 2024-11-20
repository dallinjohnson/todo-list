class Task {
  constructor(
    id,
    title,
    dueDate,
    priority = "low",
    location,
    description,
    isCompleted = false,
    projectId
  ) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.location = location;
    this.description = description;
    this.isCompleted = isCompleted;
    this.projectId = projectId;
  }
}

export { Task };

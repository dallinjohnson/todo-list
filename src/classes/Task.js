class Task {
  constructor(
    id,
    title,
    dueDate,
    priority,
    location,
    description,
    isCompleted = false
  ) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.location = location;
    this.description = description;
    this.isCompleted = isCompleted;
  }
}

export { Task };

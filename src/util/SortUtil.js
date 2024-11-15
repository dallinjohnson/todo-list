import { isBefore } from "date-fns";

const sortByTitle = (titleA, titleB) => {
  if (titleA === undefined) {
    return 1;
  } else if (titleB === undefined) {
    return -1;
  }
  return titleA.toLowerCase().localeCompare(titleB.toLowerCase());
};

const sortByDate = (dateA, dateB) => {
  if (isBefore(dateA, dateB)) {
    return -1;
  } else if (isBefore(dateB, dateA)) {
    return 1;
  } else {
    return 0;
  }
};

export { sortByTitle, sortByDate };

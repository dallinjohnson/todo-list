import { isBefore } from "date-fns";

const sortByDate = (dateA, dateB) => {
  if (isBefore(dateA, dateB)) {
    return -1;
  } else if (isBefore(dateB, dateA)) {
    return 1;
  } else {
    return 0;
  }
};

export { sortByDate };

import { format, parse } from "date-fns";

const DateUtil = (() => {
  const formatShort = (date) => format(date, "MMM d");
  const formatLong = (date) => format(date, "MMMM d, yyyy");
  const parseString = (dateStr, formatStr) =>
    parse(dateStr, formatStr, new Date());
  return { formatShort, formatLong, parseString };
})();

export { DateUtil };

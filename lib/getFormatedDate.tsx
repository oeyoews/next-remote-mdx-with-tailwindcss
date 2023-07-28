import { format, isValid, parseISO } from 'date-fns';

function getFormattedDate(date: string | object) {
  let parsedDate;

  if (typeof date === 'object' && date instanceof Date) {
    parsedDate = date;
  } else {
    parsedDate = parseISO(date.toString());
  }

  if (isValid(parsedDate)) {
    return format(parsedDate, 'yyyy-MM-dd');
  }
}
export default getFormattedDate;

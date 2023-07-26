import { format, isValid, parseISO } from 'date-fns';

// TODO: 支持各种格式的日期
function getFormattedDate(date: string) {
  const parsedDate = parseISO(date);
  const currentDate = new Date();

  if (isValid(parsedDate) && currentDate >= parsedDate) {
    return format(parsedDate, 'yyyy-MM-dd');
  }

  return false;
}
export default getFormattedDate;

// NOTE: date 最好加上引号, 时间格式化有多种, 数字不保证绝对正确
export default function getFormattedDate(dateString: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date(dateString));
}

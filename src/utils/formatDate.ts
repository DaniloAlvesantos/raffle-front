export function formatDate() {
  const date = new Date();

  const offsetMinutes = date.getTimezoneOffset();

  const offsetHours = offsetMinutes / 60;

  const brtOffsetHours = -3;

  date.setHours(date.getHours() + offsetHours + brtOffsetHours);

  const formattedDate = date.toISOString();

  return formattedDate;
}

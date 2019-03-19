export const getDayDetails = (sentDate, dayNameWanted, hoursWanted) => {
  if (sentDate === '' || sentDate == null) return '';
  let date = new Date(sentDate);
  let days = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
  let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  if (!hoursWanted) return `${days[date.getDay()]}`;
  return dayNameWanted ? `${days[date.getDay()]} - ${date.getHours()}:${minutes}` : `${dayNameWanted} - ${date.getHours()}:${minutes}`;
}
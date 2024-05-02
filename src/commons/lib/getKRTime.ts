const curr = new Date();

const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
export const kr_curr = new Date(utc + KR_TIME_DIFF);

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const getformatKRDate = () => {
  return formatDate(kr_curr);
};

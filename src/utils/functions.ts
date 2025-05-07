export const formatNumberWithComma = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatRelativeTime = (date: string) => {
  const now = new Date();
  const orderDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - orderDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else {
    return orderDate.toLocaleDateString();
  }
};

export const isExternalUrl = (url: string) =>
  url.startsWith('https:') ||
  url.startsWith('http:') ||
  url.startsWith('mailto:');

export const getRelativeSeconds = (date: number | string | Date) => {
  const result = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  return isNaN(result) ? 0 : result;
};

export const formatTimeString = (time: number) => {
  const hours = Math.floor(time / 3600_000);
  const minutes = Math.floor((time % 3600_000) / 60_000);
  const seconds = Math.floor((time % 60_000) / 1000);

  return `${hours}:${minutes}:${seconds}`;
};

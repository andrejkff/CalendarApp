export default function formatTime(time: number): string {
  return time < 10 ? `0${time}:00` : `${time}:00`;
};

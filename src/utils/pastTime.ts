import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

export const pastTime = (date: string) => {
  return dayjs(date).fromNow();
};
import { useQuery } from '@tanstack/react-query';

type Meeting = {
  id: string;
  name: string;
  duration: string;
  isOnline: string;
};

export const useMeetingData = () => {
  return useQuery<{ data: Record<string, Meeting> }, Error>({
    queryKey: ['meetingData'],
    queryFn: () =>
      fetch(
        'https://alexandrsargsyan.github.io/react-task.github.io/meetings.json'
      ).then((res) => res.json()),
    cacheTime: 10 * (60 * 1000),
  });
};

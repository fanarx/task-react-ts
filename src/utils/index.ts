import {
  Meeting,
  MeetingsByDate,
  MeetingWithDate,
  PastUpcomingMeetings,
} from '../pages/MeetingPage/types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

const sortMeetingsByStartDateTime = (
  meetings: MeetingWithDate[]
): MeetingWithDate[] => {
  const sortedMeetings = meetings.sort(
    (a: MeetingWithDate, b: MeetingWithDate) => {
      return (
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
      );
    }
  );
  return sortedMeetings;
};

export const formatMeetings = (
  meetings: Record<string, Meeting>
): MeetingWithDate[] => {
  const meetingsWithDate: MeetingWithDate[] = [];

  for (const meetingDate in meetings) {
    const meeting = meetings[meetingDate];

    meetingsWithDate.push({
      ...meeting,
      startDateTime: meetingDate,
    });
  }

  return sortMeetingsByStartDateTime(meetingsWithDate);
};

export const groupMeetingsByDate = (
  meetings: MeetingWithDate[]
): MeetingsByDate => {
  const groupedMeetings: MeetingsByDate = {};

  meetings.forEach((meeting) => {
    const date = meeting.startDateTime.split('T')[0];

    if (!groupedMeetings[date]) {
      groupedMeetings[date] = [];
    }

    groupedMeetings[date].push(meeting);
  });

  return groupedMeetings;
};

export const getEndTime = (startTime: string, duration: string): string => {
  const durationParts = duration.split(' ');
  let hours = 0;
  let minutes = 0;

  durationParts.forEach((part) => {
    if (part.includes('h')) {
      hours = parseInt(part.replace('h', ''));
    } else if (part.includes('min')) {
      minutes = parseInt(part.replace('min', ''));
    }
  });

  const startDate = new Date(startTime);
  startDate.setHours(
    startDate.getHours() + hours,
    startDate.getMinutes() + minutes
  );

  return startDate.toISOString();
};

export const getTimeOnly = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

export const isDurationLessThan30Minutes = (duration: string): boolean => {
  const hourPattern = /(\d+)h/;
  const minutePattern = /(\d+)min/;

  const hourMatch = duration.match(hourPattern);
  const minuteMatch = duration.match(minutePattern);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  const totalMinutes = hours * 60 + minutes;

  return totalMinutes < 30;
};

export const isMeetingThisWeek = (meeting: string): boolean => {
  const now = new Date();
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)
  );
  const endOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + (now.getDay() === 0 ? 0 : 7)
  );

  const meetingDate = new Date(meeting);
  return meetingDate >= startOfWeek && meetingDate <= endOfWeek;
};

export const groupPastUpcomingMeetings = (
  meetings: MeetingWithDate[]
): PastUpcomingMeetings => {
  const pastUpcomingMeetings: PastUpcomingMeetings = {
    past: [],
    upcoming: [],
  };

  const now = new Date();

  meetings.forEach((meeting) => {
    const meetingDate = new Date(meeting.startDateTime);
    if (meetingDate < now) {
      pastUpcomingMeetings.past.push(meeting);
    } else {
      pastUpcomingMeetings.upcoming.push(meeting);
    }
  });

  return pastUpcomingMeetings;
};

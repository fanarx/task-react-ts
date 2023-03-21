export type Meeting = {
  id: string;
  name: string;
  duration: string;
  isOnline: string;
};

export type MeetingWithDate = Meeting & {
  startDateTime: string;
};

export type GroupedMeetings = {
  [date: string]: MeetingWithDate[];
};

export type MeetingsByDate = {
  [date: string]: MeetingWithDate[];
};

export type PastUpcomingMeetings = {
  past: MeetingWithDate[];
  upcoming: MeetingWithDate[];
};

export type MeetingSectionProps = {
  meetings: Record<string, Meeting>;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

export type FilterOptions = {
  isUpcoming: boolean;
  isThisWeek: boolean;
  isLessThan30: boolean;
  isOnline: boolean;
};

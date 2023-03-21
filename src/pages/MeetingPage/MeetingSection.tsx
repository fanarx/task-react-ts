import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import {
  formatMeetings,
  getEndTime,
  groupPastUpcomingMeetings,
  isDurationLessThan30Minutes,
  isMeetingThisWeek,
} from '../../utils';
import MeetingsPanel from './MeetingsPanel';
import { FilterOptions, MeetingSectionProps, MeetingWithDate } from './types';

function MeetingSection({
  meetings,
  filterOptions,
  setFilterOptions,
}: MeetingSectionProps) {
  const location = useLocation();

  const formattedMeetings = useMemo(() => {
    const mtngs = formatMeetings(meetings);

    let filteredMeetings: MeetingWithDate[] = [];

    if (location.pathname.includes('filtered')) {
      filteredMeetings = [...mtngs];
      if (filterOptions.isUpcoming) {
        filteredMeetings = filteredMeetings.filter(
          (m) => new Date(getEndTime(m.startDateTime, m.duration)) > new Date()
        );
      }
      if (filterOptions.isOnline) {
        filteredMeetings = filteredMeetings.filter(
          (m) => m.isOnline === 'true'
        );
      } else {
        filteredMeetings = filteredMeetings.filter(
          (m) => m.isOnline === 'false'
        );
      }

      if (filterOptions.isLessThan30) {
        filteredMeetings = filteredMeetings.filter((m) =>
          isDurationLessThan30Minutes(m.duration)
        );
      }

      if (filterOptions.isThisWeek) {
        filteredMeetings = filteredMeetings.filter((m) =>
          isMeetingThisWeek(m.duration)
        );
      }
      return filteredMeetings;
    }
    return mtngs;
  }, [meetings, filterOptions]);

  useEffect(() => {
    if (location.pathname.includes('filtered')) {
      const queryParams = new URLSearchParams(location.search);

      const newFilterOptions: FilterOptions = {
        isUpcoming: queryParams.get('isUpcoming') === '1',
        isThisWeek: queryParams.get('isThisWeek') === '1',
        isLessThan30: queryParams.get('isLessThan30') === '1',
        isOnline: queryParams.get('isOnline') === '1',
      };

      setFilterOptions(newFilterOptions);
    }
  }, [location]);

  const groupedByPastAndUpcoming = groupPastUpcomingMeetings(formattedMeetings);

  return (
    <>
      <MeetingsPanel type="past" meetings={groupedByPastAndUpcoming.past} />
      <MeetingsPanel
        type="upcoming"
        meetings={groupedByPastAndUpcoming.upcoming}
      />
    </>
  );
}

export default MeetingSection;

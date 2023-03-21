import { useMemo } from 'react';
import {
  formatDate,
  getEndTime,
  getTimeOnly,
  groupMeetingsByDate,
} from '../../utils';
import { MeetingWithDate } from './types';

type MeetingsPanelProps = {
  type: 'past' | 'upcoming';
  meetings: MeetingWithDate[];
};

function MeetingsPanel({ type, meetings }: MeetingsPanelProps) {
  const groupedBySameDay = useMemo(() => {
    return groupMeetingsByDate(meetings);
  }, [meetings]);

  return (
    <div>
      <h1
        className={`capitalize text-center rounded-sm ${
          type === 'past' ? 'bg-red-300 text-center' : 'bg-green-300'
        }`}
      >
        {type}
      </h1>
      {Object.keys(groupedBySameDay).map((date) => (
        <div key={date}>
          <h2 className="font-medium">{formatDate(date)}</h2>
          <ul>
            {groupedBySameDay[date].map((meeting: MeetingWithDate) => (
              <li key={meeting.id} className="bg-blue-200 mb-2 p-3 rounded-md">
                {meeting.name} - ({meeting.duration}) |{' '}
                {meeting.isOnline === 'true' ? 'online' : 'offline'}
                <p>
                  <span>Starts: {getTimeOnly(meeting.startDateTime)}</span>
                  {'  '}
                  <span>
                    Ends:{' '}
                    {getTimeOnly(
                      getEndTime(meeting.startDateTime, meeting.duration)
                    )}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MeetingsPanel;

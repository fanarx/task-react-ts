import FilterSection from './FilterSection';
import MeetingSection from './MeetingSection';
import Layout from './Layout';
import { useMeetingData } from '../../services/useMeetingData';
import { useState } from 'react';
import { FilterOptions } from './types';

const initialFilterOptions = {
  isUpcoming: false,
  isThisWeek: false,
  isLessThan30: false,
  isOnline: true,
};

function MeetingPage() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilterOptions);

  const { isLoading, error, data } = useMeetingData();

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (error) return <p> An error has occurred: {error?.message}</p>;

  return (
    <Layout header={<FilterSection filterOptions={filterOptions} setFilterOptions={setFilterOptions} />}>
      <MeetingSection
        meetings={data.data}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />
    </Layout>
  );
}

export default MeetingPage;

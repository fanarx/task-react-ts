import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterOptions } from './types';

type FilterSectionProps = {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

function FilterSection({ filterOptions }: FilterSectionProps) {
  const navigate = useNavigate();
  const [localFilter, setLocalFilter] = useState(filterOptions);

  useEffect(() => {
    setLocalFilter(filterOptions);
  }, [filterOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLocalFilter((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(localFilter)) {
      if (typeof value === 'boolean') {
        if (value) queryParams.append(key, '1');
      } else {
        queryParams.append(key, value);
      }
    }

    navigate({
      pathname: '/filtered',
      search: queryParams.toString(),
    });
  };

  const handleReset = () => {
    navigate({
      pathname: '/filtered',
      search: '?isOnline=1',
    });
  };

  return (
    <div className="flex bg-orange-100">
      <div className="form-control mr-3">
        <label className="cursor-pointer label">
          <span className="label-text mr-1">Upcoming</span>
          <input
            type="checkbox"
            name="isUpcoming"
            checked={localFilter.isUpcoming}
            className="checkbox checkbox-accent"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control mr-3">
        <label className="cursor-pointer label">
          <span className="label-text mr-1">Meetings in this week</span>
          <input
            type="checkbox"
            name="isThisWeek"
            checked={localFilter.isThisWeek}
            className="checkbox checkbox-primary"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control mr-3">
        <label className="cursor-pointer label">
          <span className="label-text mr-1">Meetings which duration less than 30min</span>
          <input
            type="checkbox"
            name="isLessThan30"
            checked={localFilter.isLessThan30}
            className="checkbox checkbox-info"
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-control mr-3">
        <label className="cursor-pointer label">
          <span className="label-text mr-1">Offline</span>
          <input
            type="checkbox"
            name="isOnline"
            checked={localFilter.isOnline}
            className="toggle toggle-accent"
            onChange={handleChange}
          />
          <span className="label-text ml-1">Online</span>
        </label>
      </div>

      <button onClick={handleSubmit} className="btn btn-active btn-primary mr-3">
        Filter
      </button>
      <button onClick={handleReset} className="btn btn-active">
        Reset
      </button>
    </div>
  );
}

export default FilterSection;

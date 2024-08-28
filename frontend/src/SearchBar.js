import React from 'react';
import { ArrowRightIcon} from '@heroicons/react/20/solid';

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search"
      className="w-full pl-10 pr-4 py-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ArrowRightIcon className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2" />
  </div>
);

export default SearchBar;
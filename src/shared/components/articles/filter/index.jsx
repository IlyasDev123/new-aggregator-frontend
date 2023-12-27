import { useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const FilterModal = ({ categories, sources, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSourceChange = (selectedOption) => {
    setSelectedSource(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = {
      category_id: selectedCategory?.id,
      source_id: selectedSource?.id,
      start_date: startDate,
      end_date: endDate,
    };
    onSubmit(filter);
  };

  return (
    <div>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/4 lg:w-1/4 px-2 mb-4">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Categories
            </label>
            <Select
              className="text-gray-900"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categories}
              placeholder="Select Category..."
              isSearchable={true}
              isClearable={true}
            />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <label
              htmlFor="source"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sources
            </label>
            <Select
              className="text-gray-900"
              value={selectedSource}
              onChange={handleSourceChange}
              options={sources}
              placeholder="Select Source..."
              isSearchable={true}
              isClearable={true}
            />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <label
              htmlFor="start_date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded p-2 w-full"
            />
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <label
              htmlFor="end_date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded p-2 w-full"
            />
          </div>
          <div className="w-full px-2 mb-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Filter
            </button>

            <button
              type="submit"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSource(null);
                setStartDate(null);
                setEndDate(null);
              }}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 ml-4"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

FilterModal.propTypes = {
  categories: PropTypes.array,
  sources: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default FilterModal;

import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterModal from '../filter';
import Search from '../../search';
import Paginate from '../../paginate';
import {
  getArticles,
  getCategories,
  getSources,
  getAuthors,
} from 'shared/services/articleService';
import { Link } from 'react-router-dom';
import { setCategory } from 'shared/redux/reducers/categorySlice';
import { setSource } from 'shared/redux/reducers/sourceSlice';
import { setAuthor } from 'shared/redux/reducers/authorSlice';
import { toastMessage } from 'shared/components/toast';

const ArticleList = () => {
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState({});

  const fetchArticles = () => {
    getArticles(searchTerm, filter, currentPage)
      .then(({ data: { data } }) => {
        setArticles(data.data);
        setTotalPages(data.last_page);
        setCurrentPage(data.current_page);
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  const fetchCategories = () => {
    getCategories()
      .then(({ data: { data } }) => {
        setCategories(data);
        dispatch(setCategory(data));
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  const fetchSources = () => {
    getSources()
      .then(({ data: { data } }) => {
        setSources(data);
        dispatch(setSource(data));
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  const fetchAuthors = () => {
    getAuthors()
      .then(({ data: { data } }) => {
        setAuthors(data);
        dispatch(setAuthor(data));
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, filter, currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSources();
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const formattedCategories = useMemo(
    () =>
      categories.map((category) => ({
        id: category.id,
        value: category.name,
        label: category.name,
      })),
    [categories]
  );
  const formattedSource = useMemo(
    () =>
      sources.map((source) => ({
        id: source.id,
        value: source.id,
        label: source.name,
      })),
    [sources]
  );

  const handleFilterSubmit = (value) => {
    setFilter(value);
    // setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setFilter({});
  };

  const search = (value) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="">
      <div className="flex flex-row justify-between gap-4 mb-4">
        <Search handleSearch={search} />
        <button
          onClick={toggleFilter}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-4 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sm:ml-4"
          type="button"
        >
          {isFilterOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h4v4H3V4zm0 7h4v4H3v-4zm0 7h4v4H3v-4zm7-14h10v4H10V4zm0 7h10v4H10v-4zm0 7h7v4h-7v-4z"
              />
            </svg>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <FilterModal
          categories={formattedCategories}
          sources={formattedSource}
          onClose={toggleFilter}
          onSubmit={handleFilterSubmit}
        />
      )}
      {/* )} */}
      <div className="flex justify-between mb-4"></div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {articles.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No Records Found
          </div>
        ) : (
          articles.map((article, index) => (
            <div
              key={article.id}
              className={`rounded shadow-lg ${
                index === 0 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div
                className="relative"
                style={{ width: '100%', height: '300px' }}
              >
                <img
                  className="w-full h-72 object-cover"
                  src={article.url_to_image}
                  alt={article.title}
                />
              </div>
              <div className="px-4 py-2">
                <p className="text-gray-500 text-xs">
                  Category: {article?.category?.name} | Date:{' '}
                  {article.published_at} | Source: {article?.source?.name}
                </p>
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-gray-700 text-base">
                  {article?.description?.length > 100
                    ? article.description.substring(0, 100) + '...'
                    : article.description}
                </p>
                {article?.url && (
                  <Link
                    to={article.url}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </Link>
                  // <button
                  //   className="text-blue-500"
                  //     onClick={() => handleReadMore(article.id)}
                  // >
                  //   Read More
                  // </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="py-4 flex justify-center">
        {totalPages > 1 && (
          <Paginate
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleList;

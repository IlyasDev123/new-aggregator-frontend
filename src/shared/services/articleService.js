import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const buildQueryParams = (search, filter) => {
  const searchParams = new URLSearchParams();

  if (search) {
    searchParams.append('q', search);
  }

  if (filter) {
    const { category_id, source_id, start_date, end_date } = filter;

    if (category_id !== undefined && category_id !== null) {
      searchParams.append('category_id', category_id);
    }

    if (source_id !== undefined && source_id !== null) {
      searchParams.append('source_id', source_id);
    }

    if (start_date !== undefined && start_date !== null) {
      searchParams.append('start_date', start_date);
    }

    if (end_date !== undefined && end_date !== null) {
      searchParams.append('end_date', end_date);
    }
  }

  return searchParams.toString();
};

const getArticles = (search, filter, pageNo) => {
  const queryParams = buildQueryParams(search, filter);
  const endpoint = Endpoint.articles.getArticles + `?page=${pageNo}`;
  const url = queryParams ? `${endpoint}&${queryParams}` : endpoint;

  return HTTP_CLIENT.get(url);
};

const getCategories = () => {
  return HTTP_CLIENT.get(Endpoint.categories.getCategories);
};

const getSources = () => {
  return HTTP_CLIENT.get(Endpoint.sources.getSources);
};

const showArticle = (slug) => {
  return HTTP_CLIENT.get(Endpoint.articles.showArticle + slug);
};

const getAuthors = () => {
  return HTTP_CLIENT.get(Endpoint.authors.getAuthors);
};

export { getArticles, showArticle, getCategories, getSources, getAuthors };

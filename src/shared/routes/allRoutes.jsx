import { routeConstant } from './routeConstants';
import Login from 'pages/login';
import Register from 'pages/register';
import Article from 'pages/article';
import ArticleDetail from 'pages/article/detail';
import Setting from 'pages/setting';

const publicRoute = [
  {
    path: routeConstant.login.path,
    title: routeConstant.login.title,
    Component: Login,
  },
  {
    path: routeConstant.register.path,
    title: routeConstant.register.title,
    Component: Register,
  },
];

const privateRoute = [
  {
    path: routeConstant.article.path,
    title: routeConstant.article.title,
    Component: Article,
  },
  {
    path: routeConstant.articleDetail.path,
    title: routeConstant.article.title,
    Component: ArticleDetail,
  },
  {
    path: routeConstant.setting.path,
    title: routeConstant.setting.title,
    Component: Setting,
  },
];

export { publicRoute, privateRoute };

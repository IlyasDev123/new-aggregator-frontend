import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { showArticle } from 'shared/services/articleService';

const ArticleDetail = () => {
  const [article, setArticle] = useState([]);
  const { slug } = useParams();

  const fetchArticle = () => {
    showArticle(slug)
      .then(({ data: { data } }) => {
        setArticle(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);
  return (
    <div className="">
      <div className="flex justify-between mb-4"></div>

      <div className="">
        {article.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No Records Found
          </div>
        ) : (
          <div key={article.id} className={`rounded shadow-lg}`}>
            <div className="relative">
              <img
                className="w-full object-cover"
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
              <p className="text-gray-700 text-base">{article?.description}</p>
              <p
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: article?.content }}
              ></p>

              {/* {article?.description?.length > 100 && (
                <button
                  className="text-blue-500"
                  //   onClick={() => handleReadMore(article.id)}
                >
                  Read More
                </button>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;

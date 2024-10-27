import { copy, linkIcon, loader, tick, enter } from "../assets/index";
import { useState, useEffect } from "react";

import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        const updatedArticles = [newArticle, ...allArticles];

        setArticle(newArticle);
        setAllArticles(updatedArticles);

        // localStorage can only contain strings
        localStorage.setItem("articles", JSON.stringify(updatedArticles));
      } else {
        console.error("No summary found in the response.");
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  }

  function handleCopy(copyUrl) {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className="w-full max-w-xl mt-16">
      {/* Ṣearch */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="linkIcon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-600"
          >
            <img src={enter} alt="" className="w-4" />
          </button>
        </form>
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>

              <p className="flex-1 font-satoshi font-medium text-blue-700 text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Somethn=ing unexpected happened...
              <br />
              <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="felx flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default Demo;

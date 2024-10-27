import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
// console.log("Api key: ", rapidApiKey);

export const articleApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', "7748e23d9dmsh1b90a5e40f2d926p12bf3cjsnc5af89cbfa11");
            headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

export const { useLazyGetSummaryQuery } = articleApi;
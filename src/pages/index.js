import React, { useState, useMemo } from "react";
import { graphql } from "gatsby";

const Home = ({ data }) => {
  const [filter, setFilter] = useState("");
  const {
    allResultsJson: { nodes },
    siteBuildMetadata: { buildTime },
  } = data;
  const totalComposers = useMemo(
    () =>
      nodes.reduce((acc, cur) => {
        acc += cur.composers ? cur.composers.length : 0;
        return acc;
      }, 0),
    [nodes]
  );
  const results = useMemo(() => {
    return filter !== ""
      ? nodes.filter(({ composers, website }) => {
          const inComposers = composers
            ? composers.filter((name) => name.includes(filter)).length !== 0
            : false;
          const inWebsite = website.includes(filter);
          return inComposers || inWebsite;
        })
      : nodes;
  }, [filter, nodes]);

  return (
    <div className="max-w-4xl text-gray-800 mx-auto p-4 md:py-8">
      <div className="flex-col">
        <h1 className="text-3xl font-semibold text-blue-800">
          Composer Search
        </h1>
        <p className="md:my-3">
          👋 I found {totalComposers} matching composer names across{" "}
          {nodes.length} sites. I last checked on{" "}
          <span className="font-bold">
            {new Date(buildTime).toDateString()}
          </span>
          .
        </p>
        <div className="relative group">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-64 mb-2 border-2 border-gray-300 bg-white h-10 px-5 pl-8 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search by site or composer"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="absolute top-0 left-0 m-3 h-4 w-4 text-gray-600 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-4 border-b-2 pb-4 opacity-75">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 opacity-75 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>WEBSITE</p>
          </div>
          <div className="flex items-center">
            <svg
              className="h-5 w-5 opacity-75 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <p>COMPOSERS</p>
          </div>
        </div>
        {results.map(({ composers, website, error }) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 border-b-2 py-4">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-3"
            >
              {website.replace(/(^\w+:|^)\/\//, "")}
            </a>
            {error ? (
              <div className="bg-red-500 text-white p-2 rounded">
                <p>There was an error retrieving details for this page.</p>
              </div>
            ) : (
              <div className="prose">
                <ul>
                  {composers.map((composer) => (
                    <li>{composer}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <div className="text-gray-600 text-center mt-3">
          Built by{" "}
          <a className="text-blue-600 hover:underline" href="https://sld.codes">
            sld.codes
          </a>
        </div>
      </div>
    </div>
  );
};
export const pageQuery = graphql`
  query {
    siteBuildMetadata {
      buildTime
    }

    allResultsJson {
      nodes {
        composers
        website
        error
      }
    }
  }
`;

export default Home;

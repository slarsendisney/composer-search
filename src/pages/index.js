import React from "react"
import {graphql} from "gatsby"

const Home = ({data}) => {
    const { allResultsJson: { nodes }, siteBuildMetadata: { buildTime } } = data;
    return (
        <div className="max-w-4xl text-gray-800 mx-auto p-4 md:py-8">
            <div className="flex-col">
            <h1 className="text-3xl font-semibold text-blue-800">Composer Search</h1>
            <p className="md:mb-3">👋 I found references to your composers on {nodes.length} sites. I last checked on <span className="font-bold">{new Date(buildTime).toDateString()}</span>.</p>
            <div className="hidden md:grid grid-cols-2 gap-4 border-b-2 pb-4 opacity-75">
                <div className="flex items-center">
                <svg className="h-5 w-5 opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>WEBSITE</p>
                </div>
                <div className="flex items-center">
                <svg className="h-5 w-5 opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p>COMPOSERS</p>
                </div>
                </div>
                {nodes.map(({composers, website}) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 border-b-2 py-4">
                        <a href={website} className="text-blue-600 hover:underline mt-3">{website.replace(/(^\w+:|^)\/\//, '')}</a>
                        <div className="prose">
                            <ul>
                            {composers.map((composer) => (
                                <li>{composer}</li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    ))}
                    <div className="text-gray-600 text-center mt-3">Built by <a  className="text-blue-600 hover:underline" href="https://sld.codes">sld.codes</a></div>
            </div>
        </div>
    )
}
export const pageQuery = graphql`
  query {
    
    siteBuildMetadata {
          buildTime
    }
      
    allResultsJson {
      nodes {
        composers
        website
      }
    }
  }
`

export default Home;
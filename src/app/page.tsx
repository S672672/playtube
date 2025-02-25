"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "../components/VIdeoPlayer";

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false); 


  useEffect(() => {
    async function fetchTrendingVideos() {
      try {
        const { data } = await axios.get<{ items: Video[] }>("/api/search?query=trending");
        setTrendingVideos(data.items);
      } catch (error) {
        console.error("Error fetching trending videos", error);
      }
    }
    fetchTrendingVideos();
  }, []);

 
  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true); 
    try {
      const { data } = await axios.get<{ items: Video[] }>(`/api/search?query=${query}`);
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white p-6">
     
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] opacity-20 blur-lg"></div>

      <h1 className="relative text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
          PlayTube 🎥
      </h1>

      
      <div className="relative w-full max-w-xl mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for amazing videos..."
          className="w-full p-4 pl-10 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg transition"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 px-6 py-3 rounded-full hover:bg-red-500 transition duration-300"
        >
          🔍
        </button>
      </div>

     
      {selectedVideo && <VideoPlayer videoId={selectedVideo} />}

      
      <div className="relative w-full max-w-5xl mt-6">
        
        {!isSearching && trendingVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">🔥 Trending Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingVideos.map((video) => (
                <div
                  key={video.id.videoId}
                  onClick={() => setSelectedVideo(video.id.videoId)}
                  className="cursor-pointer p-4 rounded-lg bg-gray-800 hover:bg-gray-700 shadow-lg transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-sm font-semibold">{video.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {videos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">🔍 Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  onClick={() => setSelectedVideo(video.id.videoId)}
                  className="cursor-pointer p-4 rounded-lg bg-gray-800 hover:bg-gray-700 shadow-lg transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-sm font-semibold">{video.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

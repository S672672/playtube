import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

type ApiResponse = {
  items: VideoItem[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

  try {
    const searchQuery = query ? query : "trending videos";
    console.log('Searching for:', searchQuery); 
    const response = await axios.get<ApiResponse>(BASE_URL, {
      params: {
        part: "snippet",
        q: searchQuery,
        type: "video",
        key: API_KEY,
        maxResults: 20,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching videos:', error); 
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}

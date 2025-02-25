import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="flex justify-center">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;

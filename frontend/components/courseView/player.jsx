import ReactPlayer from "react-player";
import "./player.css";

export default function VideoPlayer({ videoUrl, handleNext, disabled }) {
  if (!videoUrl) return null;

  return (
    <div className=" w-full overflow-hidden rounded-[16px]">
      <ReactPlayer
        onEnded={!disabled ? handleNext : () => {}}
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        muted
        onContextMenu={(e) => e.preventDefault()}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
}

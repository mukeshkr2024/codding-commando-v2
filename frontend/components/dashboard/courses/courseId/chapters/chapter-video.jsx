"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Pencil, PlusCircle } from "lucide-react";
import apiClient from "lib/api-client";
import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const ChapterVideo = ({
  initialData,
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useUserAccessToken();
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const toggleEdit = () => setIsEditing((current) => !current);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isUploading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    if (isUploading) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isUploading]);

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    if (!selectedVideo.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      setVideo(null);
      return;
    }
    setVideo(selectedVideo);

    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = function () {
      window.URL.revokeObjectURL(videoElement.src);
      const duration = videoElement.duration;
      setVideoDuration(duration);
    };

    videoElement.src = URL.createObjectURL(selectedVideo);
  };

  const handleUpload = async () => {
    if (!video) {
      toast.error("Please select a video");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("videoDuration", videoDuration);

    try {
      setIsUploading(true);
      await apiClient.post(
        `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/video-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentCompleted);
          },
        },
      );
      toast.success("Chapter updated");
      toggleEdit();
      onUpdateSuccess();
    } catch (error) {
      ErrorToast(error);
    } finally {
      setIsUploading(false);
      setVideo(null);
      setProgress(0);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              {!initialData?.videoUrl ? (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add a video
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit video
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData?.videoUrl ? (
          <div className="flex items-center justify-start rounded-md bg-slate-200 p-6">
            <span className="italic text-slate-500">No Video Uploaded Yet</span>
          </div>
        ) : (
          <div className="relative mt-2 w-full">
            <video controls preload="none" className="w-full rounded-md">
              <source src={initialData?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      ) : (
        <div className="mt-6 bg-slate-100 p-4">
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="cursor-pointer"
            />
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleUpload}
              disabled={isUploading}
            >
              Upload Video
            </Button>
            {progress > 0 && (
              <div className="relative pt-1">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-600">
                      Uploading
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-xs font-semibold text-blue-600">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
                  <div
                    style={{ width: `${progress}%` }}
                    className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

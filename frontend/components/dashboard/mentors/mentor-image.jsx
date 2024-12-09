"use client";

import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import apiClient from "lib/api-client";
import { Input } from "@/components/ui/input";
import { ErrorToast } from "@/components/error-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export const MentorImageForm = ({ initialData, mentorId, onUpdateSucess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { authToken } = useUserAccessToken();
  const [image, setImage] = useState(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpdate = async (value) => {
    try {
      const data = {
        imageUrl: value,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.patch(`/mentors/${mentorId}`, data, config);
      toast.success("Member updated");
      toggleEdit();
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    } finally {
      setImage(null);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await apiClient.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      handleUpdate(data?.imageUrl);
    } catch (error) {
      ErrorToast(error);
    } finally {
      setImage(null);
    }
  };

  return (
    <div className="mt-6  rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Member image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData?.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className="mt-6  bg-slate-100 p-4">
          <div className="flex flex-col gap-4">
            <Input
              type="file"
              onChange={handleImageChange}
              className=" cursor-pointer"
            />
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Recommended aspect ratio: 16:9
          </div>
        </div>
      )}
    </div>
  );
};

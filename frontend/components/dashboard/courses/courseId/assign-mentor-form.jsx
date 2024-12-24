"use client";

import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { cn } from "lib/utils";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";

export function AssignMentorForm({ initialData, courseId, onUpdateSucess }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [mentors, setMentors] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const { authToken } = useUserAccessToken();

  const toggleEdit = () => setIsEditing((current) => !current);

  const fetchMentors = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const { data } = await apiClient.get("/mentors", config);
      setMentors(data.mentors);
    } catch (error) {
      // toast.error("Something went wrong");
    }
  };

  React.useEffect(() => {
    fetchMentors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMentorList = () => {
    return (
      <CommandGroup>
        {mentors.map((mentor) => (
          <CommandItem
            key={mentor._id}
            value={mentor._id}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
              setOpen(false);
            }}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === mentor._id ? "opacity-100" : "opacity-0",
              )}
            />
            {mentor.name}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  };

  const handleAssignMentor = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const dataToSend = {
        mentorId: value,
      };
      await apiClient.post(
        `/courses/${courseId}/assign-mentor`,
        dataToSend,
        config,
      );
      toast.success("Mentor assigned ");
      toggleEdit();
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  const handleUnAssignMentor = async (value) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const dataToSend = {
        mentorId: value,
      };
      await apiClient.post(
        `/courses/${courseId}/unassign-mentor`,
        dataToSend,
        config,
      );
      toast.success("Mentor Unassigned successfully!");
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="mt-6 w-full rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between px-2 font-medium">
        Assign Mentor
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Assign Mentor
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData && initialData?.mentors?.length > 0 ? (
            <div className="flex flex-col gap-1">
              {initialData?.mentors?.map((mentor) => (
                <div
                  key={mentor._id}
                  className="flex items-center justify-between rounded-lg border border-slate-300 px-5 shadow-sm"
                >
                  <p className="text-sm text-slate-700">{mentor.name}</p>
                  <Button
                    className="m-1.5 h-8 w-20 rounded-md text-xs"
                    variant="destructive"
                    onClick={() => handleUnAssignMentor(mentor._id)}
                  >
                    UnAssign
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="pl-2 text-sm text-slate-700">Not yet assigned</p>
          )}
        </>
      )}
      {isEditing && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? mentors.find((mentor) => mentor._id === value)?.name
                : "Select mentor..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search mentor..." />
              <CommandEmpty>No mentor found.</CommandEmpty>
              {renderMentorList()}
            </Command>
          </PopoverContent>
          <div className="mt-4">
            <Button onClick={handleAssignMentor} disabled={!value}>
              Assign Mentor
            </Button>
          </div>
        </Popover>
      )}
    </div>
  );
}

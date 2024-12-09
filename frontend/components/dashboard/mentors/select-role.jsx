import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Select from "react-select";
import { ErrorToast } from "@/components/error-toast";
import apiClient from "lib/api-client";
import toast from "react-hot-toast";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

export function SelectRole({ initialData, mentorId, onUpdateSucess }) {
  const { authToken } = useUserAccessToken();
  const [selectedRole, setSelectedRole] = useState(initialData?.role || null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const Roles = [
    { label: "Mentor", value: "mentor" },
    { label: "Member", value: "member" },
  ];

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption?.value || null);
  };

  const handleSubmit = async () => {
    try {
      const value = { role: selectedRole };

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      await apiClient.patch(`/mentors/${mentorId}`, value, config);
      toggleEdit();
      toast.success("Updated");
      onUpdateSucess();
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <div className="mt-6 w-full rounded-md border bg-slate-100 p-4 md:mb-16">
      <div className="flex items-center justify-between px-2 font-medium">
        Role
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Assign Role
            </>
          )}
        </Button>
      </div>

      {isEditing && (
        <div className="flex items-center gap-4 px-2">
          <Select
            value={Roles.find((role) => role.value === selectedRole)}
            onChange={handleRoleChange}
            options={Roles}
            className="w-48"
          />
          <Button onClick={handleSubmit}>Assign</Button>
        </div>
      )}

      {!isEditing && <p className="px-2 text-sm">{initialData?.role}</p>}
    </div>
  );
}

import { ErrorToast } from "@/components/error-toast";
import { Button } from "@/components/ui/button";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function LiveClassTiming({
  initialData,
  courseId,
  moduleId,
  chapterId,
  onUpdateSuccess,
}) {
  const [selectedDate, setSelectedDate] = useState(initialData?.live_date);
  const [selectedTime, setSelectedTime] = useState(initialData?.live_time);
  const { authToken } = useUserAccessToken();

  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const data = {
        date: formattedDate,
        time: selectedTime,
      };

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        await apiClient.post(
          `/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/send-notifications`,
          data,
          config,
        );
        toast.success("Scheduled successfully");
        onUpdateSuccess();
      } catch (error) {
        ErrorToast(error);
      }
    } else {
      alert("Please select both date and time.");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <h4 className="mb-4 text-lg font-medium text-gray-700">
        Schedule a Class
      </h4>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            minDate={new Date()}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600">Select Time</label>
          <select
            value={selectedTime}
            onChange={handleTimeChange}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a time
            </option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <Button
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          disabled={
            !selectedDate ||
            !selectedTime ||
            !initialData?.isLive ||
            !initialData?.liveUrl
          }
        >
          Schedule
        </Button>
      </form>
    </div>
  );
}

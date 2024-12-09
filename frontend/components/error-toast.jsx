import toast from "react-hot-toast";

export const ErrorToast = (error, defaultMessage = "Something went wrong") => {
  const toastMessage =
    error.response?.data?.message || error.message || defaultMessage;
  toast.error(toastMessage);
};

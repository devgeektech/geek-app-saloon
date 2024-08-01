import { toast } from "react-toastify";

const toastOptions: any = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

export const renderMessageToaster = (message: string, messageType: string) => {
  if (messageType === "error") return toast.error(message, toastOptions);
  else return toast.success(message, toastOptions);
};

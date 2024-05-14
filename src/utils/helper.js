import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

import { MESSAGE } from "./constants";

export const classNames = (...classes) =>
  twMerge(classes.filter(Boolean).join(" "));

/* Success Toast Message*/
export const successToast = (msg = MESSAGE.SUCCESS, toastId = "") =>
  toast.success(msg, {
    autoClose: 2000,
    id: toastId,
  });

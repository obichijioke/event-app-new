import { toast } from "sonner";

const useSuccessHandler = () => {
  const handleSuccess = (success: string = "Operation Successful") => {
    const message = success;
    toast.success(message);
  };

  return handleSuccess;
};

export default useSuccessHandler;

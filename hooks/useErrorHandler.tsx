import { toast } from "sonner";

const useErrorHandler = () => {
  const handleError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    toast.error(message);
    console.error(error);
  };

  return handleError;
};

export default useErrorHandler;

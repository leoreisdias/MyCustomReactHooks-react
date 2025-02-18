import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const useHookFormReset = (form: UseFormReturn<any>) => {
  const [success, setSuccess] = useState(false);

  const { reset } = form;

  useEffect(() => {
    if (success) {
      reset();
      setSuccess(false);
    }
  }, [success, reset]);

  const resetForm = useCallback(() => {
    setSuccess(true);
  }, []);

  return { resetForm };
};

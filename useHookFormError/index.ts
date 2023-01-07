// NOTE: When using React Hook Form Controller, you can use the following code to check for errors and handle them:

// NOTE: Validates and returns message from normal fields, Object Fields or Field Arrays

import { findKeyChainInsideObjectRecursive } from "./helpers";

export const useHookFormError = (errors: any, name: string) => {
  const errorFound = findKeyChainInsideObjectRecursive(
    errors,
    name?.split(".") ?? []
  );

  const getErrorMessage = () => {
    if (!errorFound) return "";

    if (errorFound && errorFound.message) {
      return errorFound.message;
    }

    return "";
  };

  return {
    hasError: !!errorFound,
    errorMessage: getErrorMessage(),
  };
};

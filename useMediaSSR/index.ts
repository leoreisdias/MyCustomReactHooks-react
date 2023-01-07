// NOTE: Just Client Side version can be found in useHooks.com or usehooks-ts.com
// Ex.: https://usehooks-ts.com/react-hook/use-media-query

// NOTE: PURPOSE: useMediaQuery with SSR Handler - Deals with window problem and Hydration problem
// (useIsClient usage necessary if you face Hydration problems)

import { useEffect, useState } from "react";

import { useSsr } from "./useSSR";

const useMediaQuery = (query: string): boolean => {
  const { isBrowser } = useSsr();

  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (isBrowser) {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isBrowser]);

  return matches;
};

export { useMediaQuery };

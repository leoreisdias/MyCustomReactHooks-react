// NOTE: Same as the useSsr from usehooks-ts.com but deals with Hydration problem
// https://usehooks-ts.com/react-hook/use-ssr

// NOTE: useSsr is a custom hook that returns a boolean value indicating whether the component is being rendered on the server or the client - Deals with hydration problem

import { useEffect, useState } from "react";

const useSSR = () => {
  const [isMounted, setIsMounted] = useState(false); // NOTE: Only if your are facing Hydration problem

  const isDOM =
    typeof window !== "undefined" &&
    window.document &&
    window.document.documentElement;

  useEffect(() => {
    setIsMounted(true); // NOTE: Only if your are facing Hydration problem
  }, []);

  return {
    isBrowser: isDOM && isMounted, // NOTE: "isMounted" is only if your are facing Hydration problem
    isServer: !isDOM || !isMounted,
  };
};

export { useSsr };

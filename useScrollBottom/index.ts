// NOTE: Execute an action once the user gets to the bottom of screen

import { useEffect } from "react";

type UseScrollBottomProps = {
  onBottomHit: () => void;
};

export const useScrollBottom = ({ onBottomHit }: UseScrollBottomProps) => {
  useEffect(() => {
    const handleScroll = () => {
      // detect scroll to bottom
      if (
        document.documentElement.scrollTop + window.innerHeight !==
        document.documentElement.scrollHeight
      )
        return;

      onBottomHit();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onBottomHit]);
};

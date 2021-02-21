import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  element: HTMLDivElement | null,
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ element }) => {
  const pathname = useLocation();

  useEffect(() => {
    if (element) {
      try {
        element.scrollTo(0, 0);
      }
      catch (error) {
        // do nothing
        // for some reason above statement is throwing exceptions in tests
      }
    }
  }, [element, pathname]);

  return null;
}

export default ScrollToTop;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTopProps = {
  element: HTMLDivElement | null,
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ element }) => {
  const pathname = useLocation();

  useEffect(() => {
    if (element) {
      element.scrollTo(0, 0);
    }
  }, [element, pathname]);

  return null;
}

export default ScrollToTop;

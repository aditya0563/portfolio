import { useState, useEffect } from "react";
import Laptop from "./Laptop";
import Mobile from "./Mobile";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
    };

    // Set initial value on mount
    handleResize();

    // Listen for screen resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <Mobile /> : <Laptop />;
};

export default App;
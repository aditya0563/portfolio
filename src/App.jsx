import { useState, useEffect } from "react";
import Laptop from "./Laptop";
import Mobile from "./Mobile";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
    };


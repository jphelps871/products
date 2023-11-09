import { useState, useEffect } from "react";

export function usePreviousUrlLocation() {
  const [ref, setRef] = useState("/");

  /* 
    Go back to roadmap page when user has come from that location.
    prevPath set in _app.js.
  */
  useEffect(() => {
    const previousLocation = sessionStorage.getItem("prevPath");
    if (previousLocation == "/roadmap") {
      setRef("/roadmap");
    }
  }, []);

  return ref;
}

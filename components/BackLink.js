import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BackLink({ color }) {
  const [ref, setRef] = useState("/");
  const router = useRouter();

  //  Styles
  const textColor = !color ? "text-light-slate" : "text-white";
  const iconColor = !color ? "#4661E6" : "#ffffff";

  /* 
    Go back to roadmap page when user has come from that location.
    prevPath set in _app.js.
  */
  useEffect(() => {
    const previousLocation = sessionStorage.getItem("prevPath");
    if (previousLocation == "/roadmap" && router.pathname !== "/roadmap") {
      setRef("/roadmap");
    }
  }, []);

  return (
    <Link href={ref} className="flex items-center">
      <svg width="6" height="8" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33447 9L2.33447 5L6.33447 1" stroke={iconColor} strokeWidth="2" />
      </svg>
      <p className={`${textColor} font-bold ml-2 hover:underline text-sm`}>Go Back</p>
    </Link>
  );
}

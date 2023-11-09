import Link from "next/link";
import { usePreviousUrlLocation } from "@/hooks/usePreviousLocation";

export default function BackLink({ color }) {
  const path = usePreviousUrlLocation();

  //  Styles
  const textColor = !color ? "text-light-slate" : "text-white";
  const iconColor = !color ? "#4661E6" : "#ffffff";

  return (
    <Link href={path} className="flex items-center">
      <svg width="6" height="8" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.33447 9L2.33447 5L6.33447 1" stroke={iconColor} strokeWidth="2" />
      </svg>
      <p className={`${textColor} font-bold ml-2 hover:underline text-sm`}>Go Back</p>
    </Link>
  );
}

import Image from "next/image";

export default function Avatar({ imgUrl }) {
  return (
    <div className="rounded-full w-12 h-12  sm:w-14 sm:h-14 overflow-hidden">
      <Image width={100} height={100} referrerPolicy="no-referrer" src={imgUrl} alt="avatar img" />
    </div>
  );
}

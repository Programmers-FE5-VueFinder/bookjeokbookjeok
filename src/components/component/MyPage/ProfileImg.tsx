export default function ProfileImg({ src }: { src: string | null }) {
  return (
    <>
      <img
        src={src || undefined}
        className="relative size-[100px] rounded-full bg-white"
        referrerPolicy="no-referrer"
      ></img>
    </>
  );
}

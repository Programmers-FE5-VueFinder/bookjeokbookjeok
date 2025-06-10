export default function ProfileImg({
  src,
}: {
  src: string;
}) {
  console.log(src);
  return (
    <>
      <img
        src={src || undefined}
        className="relative size-[100px] rounded-full bg-white"
      ></img>
    </>
  );
}

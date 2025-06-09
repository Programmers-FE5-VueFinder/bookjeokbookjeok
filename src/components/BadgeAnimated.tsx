const BadgeAnimated = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/assets/챗씨앗배경"
        alt="책씨앗 배경"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <img
        src="/assets/책씨앗.png"
        alt="움직이는 씨앗"
        className="absolute w-16 h-16 animate-float z-10"
        style={{ top: '50%', left: '20%' }}
      />
    </div>
  );
};

export default BadgeAnimated;

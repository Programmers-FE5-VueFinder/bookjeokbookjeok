const genreImageMap: Record<string, { image: string; label: string }> = {
  novel: {
    image: "/images/home_novel_illust.png",
    label: "소설",
  },
  education: {
    image: "/images/home_edu_illust.png",
    label: "교육",
  },
  development: {
    image: "/images/home_dev_illust.png",
    label: "자기 개발",
  },
  humanities: {
    image: "/images/home_humanities_illust.png",
    label: "인문",
  },
}

export default function PopularDiaryCard ({ genre, title, content }: PopularDiaryCardProps) {

  const genreData = genreImageMap[genre] || {
    image: "",
    label: "기타",
  }

  return (
    <div 
        className="flex w-[590px] h-[150px] rounded-[20px] px-[8px] py-[10px]"
        style={{
            boxShadow: '0px 0px 4px rgba(0, 141, 16, 0.3)',
        }}  
    >
        <img 
            src={genreData.image} 
            alt={genreData.label}
            className="w-[130px] h-[130px] rounded-[15px] mr-[15px]"
        />
      
        <div className="flex flex-col gap-y-[10px]">
            <h2 className="text-[16px] font-semibold text-[#06BE00]">{genreData.label}</h2>
            <h2 className="text-[16px] font-semibold">{content}</h2>
            <h1 className="text-[20[px] font-semibold">{title}</h1>
        </div>
    </div>
  );
}
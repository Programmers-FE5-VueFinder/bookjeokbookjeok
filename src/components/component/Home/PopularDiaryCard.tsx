import type { PopularDiaryCardProps } from "../../../types/type";

const genreImageList = [
  {
    match: (genre: string) => genre.includes('인문'),
    image: "/images/home_humanities_illust.png",
    label: "인문",
  },
  {
    match: (genre: string) => genre.includes('소설'),
    image: '/images/home_novel_illust.png',
    label: '소설',
  },
  {
    match: (genre: string) => genre.includes('교육'),
    image: '/images/home_edu_illust.png',
    label: '교육',
  },
  {
    match: (genre: string) => genre.includes('개발') || genre.includes('자기계발'),
    image: '/images/home_dev_illust.png',
    label: '자기 개발',
  },
];

  
export default function PopularDiaryCard({genre, title, content}: PopularDiaryCardProps) {
  const getGenreImage = (genre: string) => {
    return genreImageList.find((item) => item.match(genre)) ?? null;
  };
  if (!genre) return null; // 장르값 유효하지 않으면 렌더링 안 함
  
  const genreData = getGenreImage(genre);
  if (!genreData) return null;

  return (
    <div
      className="flex h-[150px] w-[590px] rounded-[20px] px-[8px] py-[10px]"
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

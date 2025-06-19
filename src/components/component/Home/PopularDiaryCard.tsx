import { Link } from 'react-router';
import type { PopularDiaryCardProps } from '../../../types/type';
import { genreImageList } from '../../../constants/genreImageList';

function decodeHtmlEntities(str: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(str, 'text/html').body.textContent;
  return decodedString || '';
}

export default function PopularDiaryCard({
  genre,
  title,
  content,
  id,
}: PopularDiaryCardProps) {
  const getGenreImage = (genre: string) => {
    return genreImageList.find((item) => item.match(genre)) ?? null;
  };
  if (!genre) return null; // 장르값 유효하지 않으면 렌더링 안 함

  const genreData = getGenreImage(genre);
  if (!genreData) return null;

  return (
    <Link to={`/post/${id}`}>
      <div
        className="flex h-[150px] w-[590px] rounded-[20px] px-[8px] py-[10px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 141, 16, 0.3)',
        }}
      >
        <img
          src={genreData.image}
          alt={genreData.label}
          className="mr-[15px] h-[130px] w-[130px] rounded-[15px]"
        />

        <div className="flex flex-col gap-y-[10px]">
          <h2 className="text-[16px] font-semibold text-[#06BE00]">
            {genreData.label}
          </h2>
          <div>
            <h2 className="line-clamp-2 text-[16px] font-semibold">
              {decodeHtmlEntities(content)}
            </h2>
          </div>
          <div>
            <h1 className="line-clamp-1 font-semibold text-[20[px]">{decodeHtmlEntities(title)}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
}

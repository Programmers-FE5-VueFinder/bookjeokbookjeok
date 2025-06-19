export const genreImageList = [
  {
    match: (genre: string) => genre.includes('인문'),
    image: '/images/home_humanities_illust.png',
    label: '인문',
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
    match: (genre: string) =>
      genre.includes('자기개발') ||
      genre.includes('자기계발') ||
      genre.includes('개발'),
    image: '/images/home_dev_illust.png',
    label: '자기 개발',
  },
];
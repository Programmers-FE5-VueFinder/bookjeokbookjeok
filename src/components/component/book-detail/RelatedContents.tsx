export default function RelatedContents() {
  const relatedBooks = [
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장)',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 ',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
    {
      isbn13: '9791130698366',
      title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
      author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
      cover: 'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    },
  ];
  return (
    <>
      <div className='h-full max-h-[67vh] overflow-auto custom-scrollbar rounded-[10px]'>
        <p className='text-center font-semibold text-[20px] my-[30px]'>연관 컨텐츠</p>

        <div className='flex flex-wrap justify-between px-[25px] gap-y-[40px]'>
          {relatedBooks.map((book) => (
            <div key={book.isbn13} className='w-[150px] flex-shrink-0 cursor-pointer'>
              <img src={book.cover} className='w-[150px]' />
              <div className='font-semibold text-[14px] text-center'>{book.title}</div>
              <div className='font-medium text-[14px] text-center'>{book.author.split('(')[0]}</div>
            </div>
          ))}
          {relatedBooks.length % 3 === 1 && <div className='w-[150px]'></div>}
          {relatedBooks.length % 3 === 2 && <div className='w-[150px]'></div>}
        </div>
      </div>
    </>
  );
}

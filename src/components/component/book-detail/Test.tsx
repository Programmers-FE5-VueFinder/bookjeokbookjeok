import { useState } from 'react';
import ReactDOM from 'react-dom';
import BookPage from './BookPage';

const bookDetail = [
  {
    title: '아비투스 (양장) - 인간의 품격을 결정하는 7가지 자본',
    link: 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=313961252&amp;partner=openAPI&amp;start=api',
    author: '도리스 메르틴 (지은이), 배명자 (옮긴이)',
    pubDate: '2023-03-24',
    description:
      '2020년 출간 즉시 인문 분야 베스트셀러에 오르며 신드롬을 일으킨 『아비투스』가 양장특별판으로 새롭게 출간되었다. 이번 특별판은 한국어판 서문을 추가하고 고급스러운 하드커버로 소장 가치를 높였다.',
    isbn: 'K082832106',
    isbn13: '9791130698366',
    itemId: 313961252,
    priceSales: 19800,
    priceStandard: 22000,
    mallType: 'BOOK',
    stockStatus: '',
    mileage: 1100,
    cover:
      'https://image.aladin.co.kr/product/31396/12/cover200/k082832106_1.jpg',
    categoryId: 51378,
    categoryName: '국내도서>인문학>교양 인문학',
    publisher: '다산초당(다산북스)',
    salesPoint: 18976,
    adult: false,
    fixedPrice: true,
    customerReviewRank: 9,
    subInfo: {
      subTitle: '인간의 품격을 결정하는 7가지 자본',
      originalTitle: 'Habitus. Sind Sie bereit fur den Sprung nach ganz oben?',
      itemPage: 372,
    },
  },
];

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <img
          src={bookDetail[0].cover}
          onClick={handleOpen}
          className={`origin-left transition-all duration-600 ease-in-out ${
            isOpen && true
              ? 'pointer-events-none z-2 mt-[-50px] h-[220px] w-[150px] translate-x-[-5px] scale-300 -rotate-y-180 rounded-2xl opacity-0'
              : 'h-[220px] w-[150px] cursor-pointer rounded-sm hover:-translate-y-2 hover:scale-110 hover:shadow-lg'
          }`}
        />
        {isOpen &&
          ReactDOM.createPortal(
            <BookPage
              isOpen={isOpen}
              closeModal={closeModal}
              bookDetail={bookDetail[0]}
            />,
            document.body,
          )}
      </div>
    </>
  );
}

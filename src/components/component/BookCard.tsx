export default function BookCard() {
  return (
    <>
      <div className="h-[258px] w-[189.71px] flex-col justify-center rounded-2xl border-1 border-red-500 text-center">
        <div className="mx-[7.59px] mt-[8.35px] h-[172.25px] w-[174.53px] rounded-2xl border-1"></div>
        <div className="mx-[7.99px] text-start">
          <div className="mt-[10.1px] inline-block h-[20.9px] w-[50.34px] justify-center rounded-[5px] border-1 text-center">
            <span>소설</span>
          </div>
          <div>
            <span>구의 증명</span>
          </div>
        </div>
      </div>
    </>
  );
}

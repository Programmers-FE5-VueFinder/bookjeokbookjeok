export default function PopularDiaryCard () {
  return (
    <div 
        className="flex w-[590px] h-[150px] rounded-[20px] px-[8px] py-[10px]"
        style={{
            boxShadow: '0px 0px 4px rgba(0, 141, 16, 0.3)',
          }}  
    >
        <img 
            src="" 
            alt="" 
            className="w-[130px] h-[130px] rounded-[15px] mr-[15px] border"
        />
      
        <div className="flex flex-col gap-y-[10px]">
            <h2 className="text-[16px] font-semibold text-[#06BE00]">소설</h2>
            <h2 className="text-[16px] font-semibold">접경의 긴 터널을 빠져나오자, 설국이었다</h2>
            <h1 className="text-[20[px] font-semibold">설국</h1>
        </div>
    </div>
  );
}
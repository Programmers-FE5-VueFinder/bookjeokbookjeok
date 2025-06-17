import { twMerge } from 'tailwind-merge';
import { fetchUser } from '../apis/user';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import UserCard from '../components/common/UserCard';
// import BookCard from '../components/common/BookCard';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import UserCardSkeleton from '../components/common/UserCardSkeleton';
// import type { Post } from '../types/type';

export default function SearchResult() {
  const [users, setUsers] = useState<User[]>([]);
  const buttonName = ['통합 검색', '사용자', '게시물'];
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<string>('통합 검색');
  
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); 


  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();

    // 사용자 필터링
    const filteredU = users.filter(user => 
      user.name?.toLowerCase().includes(keyword) ||
      user.intro?.toLowerCase().includes(keyword)
    );

    // 게시물 필터링
    // const filteredP = dummyPosts.filter(post => 
    //   post.title.toLowerCase().includes(keyword) ||
    //   post.body.toLowerCase().includes(keyword)
    // );

    setFilteredUsers(filteredU);
    // setFilteredPosts(filteredP);
  };
  
  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const fetchUsers = await fetchUser();
        setUsers(fetchUsers || []);
        setFilteredUsers(fetchUsers || []);
      } catch (error) {
        console.error('유저 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="justify-center, flex flex-col items-center">
        <div className="relative flex h-[230px] w-full flex-col items-center justify-center gap-[27px] pb-[40px] shadow shadow-gray-200">
          <h1 className="textH1">검색</h1>
          <div className="relative flex rounded-sm border-2 border-[#d2d2d2]">
            <input
              type="text"
              className="h-[60px] w-[687px] rounded-sm pl-[23px]"
              placeholder="검색어를 입력해 주세요"
              value={searchKeyword}
              onChange={(e) => {
                const value = e.target.value;
                setSearchKeyword(value);
                if (value.trim() === '') {
                  setFilteredUsers(users); 
                } else {
                  setFilteredUsers(users); 
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />

            <button 
              className="absolute top-[32.5%] right-5 cursor-pointer justify-center"
              onClick={handleSearch}
            >
              <IoSearch className="size-[22px]" />
            </button>
          </div>
          <div className="absolute bottom-0 flex h-[40px] w-full content-center items-center justify-center">
            <div className="flex w-[1200px] items-center justify-center">
              {buttonName.map((item) => {
                return (
                  <button
                    className={twMerge(
                      item === selectedBtn ? 'button-active' : 'button',
                    )}
                    onClick={handleContentButton}
                    key={item}
                    name={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-[#FAFAFA]">
          {/* 사용자 영역 */}
          {(selectedBtn === '통합 검색' || selectedBtn === '사용자') && (
            <div className="m-[100px] max-w-[1200px]">
              <div className='flex justify-between items-center'>
                <span className="textT2">사용자</span>
                {selectedBtn === '통합 검색' && (
                  <MdOutlineKeyboardArrowRight 
                    size={30} 
                    color="#1C1C1C" 
                    className='cursor-pointer'
                    onClick={() => setSelectedBtn('사용자')}
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="mt-[30px] grid gap-[47px] md:grid-cols-2 lg:grid-cols-6">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, idx) => (
                        <UserCardSkeleton key={idx} />
                      ))
                    : (searchKeyword ? filteredUsers : users)
                      .slice(0, selectedBtn === '통합 검색' ? 6 : undefined)
                      .map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                </div>
              </div>
            </div>
          )}

          {/* 게시물 영역 */}
          {(selectedBtn === '통합 검색' || selectedBtn === '게시물') && (
            <div className="m-[50px] max-w-[1200px]">
              <div className='flex justify-between items-center'>
                <span className="textT2">게시물</span>
                {selectedBtn === '통합 검색' && (
                  <MdOutlineKeyboardArrowRight 
                    size={30} 
                    color="#1C1C1C" 
                    className='cursor-pointer'
                    onClick={() => setSelectedBtn('게시물')}
                  />
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="mt-[26px] grid gap-[28px] md:grid-cols-2 lg:grid-cols-4">
                  {/* <BookCard /> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { fetchUser } from '../apis/user';
import type { Post } from '../types/type';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import type { PostDetail } from '../types/type';
import UserCard from '../components/common/UserCard';
import BookCard from '../components/common/BookCard';
import { fetchPosts, fetchPostDetail } from '../apis/post';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import UserCardSkeleton from '../components/common/UserCardSkeleton';

export default function SearchResult() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<PostDetail[]>([]);
  const buttonName = ['통합 검색', '사용자', '게시물'];
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState<string>('통합 검색');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostDetail[]>([]);

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();

    const filteredU = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(keyword) ||
        user.intro?.toLowerCase().includes(keyword),
    );

    const filteredP = posts.filter(
      (post) =>
        (post.title?.toLowerCase().includes(keyword) ?? false) ||
        (post.body?.toLowerCase().includes(keyword) ?? false),
    );

    console.log('filteredP:', filteredP);
    console.log('searchKeyword:', searchKeyword);

    setFilteredUsers(filteredU);
    setFilteredPosts(
      [...filteredP].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
  };

  const handleContentButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setSelectedBtn(name);
  };

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const sortedFilteredPosts = [...filteredPosts].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

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

  useEffect(() => {
    const loadPosts = async () => {
      const result = await fetchPosts();
      if (!result || !result.data) {
        console.error('게시글 불러오기 실패', result?.error);
        setPosts([]);
        return;
      }
      const detailPosts: PostDetail[] = await Promise.all(
        result.data.map(async (post: Post) => {
          const detail = await fetchPostDetail(post.id);
          // console.log('Post Detail 응답 데이터:', detail);
          return {
            ...post,
            profile: detail?.profile ?? {
              id: 'unknown',
              name: '익명',
              image: null,
              intro: null,
              appellation: null,
              created_at: new Date().toISOString(),
            },
            like: detail?.like ?? [],
            comment: detail?.comment ?? [],
            book: detail?.book
              ? {
                  id: detail.book.id,
                  cover: detail.book.cover ?? '',
                }
              : undefined,
          };
        }),
      );
      setPosts(detailPosts);
    };
    loadPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
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
                  setFilteredPosts(posts);
                } else {
                  setFilteredUsers(users);
                  setFilteredPosts(posts);
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

        <div className="flex w-full flex-col items-center justify-center bg-[#FAFAFA] pt-[50px]">
          {/* 사용자 영역 */}
          {(selectedBtn === '통합 검색' || selectedBtn === '사용자') && (
            <div className="m-[50px] min-h-[305px] min-w-[1200px]">
              <div className="flex items-center justify-between">
                <span className="textT2">사용자</span>
                {selectedBtn === '통합 검색' && (
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    color="#1C1C1C"
                    className="cursor-pointer"
                    onClick={() => setSelectedBtn('사용자')}
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="mt-[30px] grid gap-[47px] md:grid-cols-2 lg:grid-cols-6">
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <UserCardSkeleton key={idx} />
                    ))
                  ) : (searchKeyword ? filteredUsers : users).length === 0 ? (
                    <div className="col-span-6 py-10 text-center text-gray-500">
                      검색 결과가 없습니다.
                    </div>
                  ) : (
                    (searchKeyword ? filteredUsers : users)
                      .slice(0, selectedBtn === '통합 검색' ? 6 : undefined)
                      .map((user) => <UserCard key={user.id} user={user} />)
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 게시물 영역 */}
          {(selectedBtn === '통합 검색' || selectedBtn === '게시물') && (
            <div className="m-[50px] min-h-[305px] min-w-[1200px]">
              <div className="flex items-center justify-between">
                <span className="textT2">게시물</span>
                {selectedBtn === '통합 검색' && (
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    color="#1C1C1C"
                    className="cursor-pointer"
                    onClick={() => setSelectedBtn('게시물')}
                  />
                )}
              </div>

              <div className="flex flex-col">
                <div className="mt-[26px] grid gap-[28px] md:grid-cols-2 lg:grid-cols-4">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-[320px] w-full rounded bg-gray-200"
                      />
                    ))
                  ) : (searchKeyword ? sortedFilteredPosts : sortedPosts)
                      .length === 0 ? (
                    <div className="col-span-6 mt-1 ml-[49px] flex py-10 text-center text-gray-500">
                      검색 결과가 없습니다.
                    </div>
                  ) : (
                    (searchKeyword ? sortedFilteredPosts : sortedPosts)
                      .slice(0, selectedBtn === '통합 검색' ? 8 : undefined)
                      .map((post) => (
                        <Link
                          key={post.id}
                          to={`/post/${post.id}`}
                        >
                          <BookCard
                            nickname={post.profile.name || '잉크묻은 고양이'}
                            title={post.title}
                            body={post.body}
                            image={
                              post.category === 'diary'
                                ? (post.book?.cover ?? '')
                                : post.image
                            }
                            profileImage={post.profile.image}
                            likes={post.like.length}
                            comments={post.comment.length}
                            id={post.profile.id}
                            createdAt={new Date(
                              post.created_at,
                            ).toLocaleDateString()}
                            category={post.category}
                            book_id={post.book?.id}
                          />
                        </Link>
                      ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

import { RxDotsVertical } from 'react-icons/rx';
import { useParams } from 'react-router';
import { useAuthStore } from '../../../../store/authStore';
import { useEffect, useState } from 'react';
import {
  addComment,
  deleteComment,
  updateComment,
} from '../../../../apis/comment';
import getElapsedTime from '../../../../utils/format-time';
import { GoPaperAirplane } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import type { CommentTypeBase } from '../../../../types/type';

type Props = {
  comments: CommentTypeBase[];
  fetchComments: () => void;
};

export default function Comment({ comments, fetchComments }: Props) {
  const { postId } = useParams();
  const session = useAuthStore((state) => state.session);
  const userId = session?.user?.id;

  const [replyBody, setReplyBody] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.menu-trigger') || target.closest('.menu-dropdown')) {
      return;
    }
    setActiveMenuId(null);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyBody.trim() || !userId) return;

    try {
      await addComment(postId!, userId, replyBody, parentId);
      setReplyBody('');
      setReplyTo(null);
      fetchComments();
    } catch (err) {
      console.error('답글 작성 실패', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      fetchComments();
    } catch (err) {
      console.error('삭제 실패', err);
    }
  };

  const startEdit = (comment: CommentTypeBase) => {
    if (comment.user_id !== userId) {
      alert('본인 댓글만 수정할 수 있습니다.');
      return;
    }
    setEditingId(comment.id);
    setEditBody(comment.body);
    setActiveMenuId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditBody('');
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBody.trim() || !editingId) return;

    try {
      await updateComment(editingId, editBody);
      setEditingId(null);
      setEditBody('');
      fetchComments();
    } catch (err) {
      console.error('수정 실패', err);
    }
  };

  return (
    <section className="mx-auto w-[1200px]">
      {comments
        .filter((comment) => comment.parent_comment_id === null)
        .map((parent) => (
          <article
            key={parent.id}
            className="border-b border-[#d8d6d6d6] py-[40px]"
          >
            <header className="relative mb-[25px] flex items-center justify-between text-[#333]">
              <div className="flex w-full items-center gap-[10px] text-[#333]">
                {parent.profile.image ? (
                  <img
                    src={parent.profile.image}
                    alt="profile"
                    className="h-[25px] w-[25px] rounded-full"
                  />
                ) : (
                  <div className="h-[25px] w-[25px] rounded-full bg-black" />
                )}
                <span>{parent.profile.name}</span>
                <time>{getElapsedTime(parent.created_at)}</time>
              </div>

              <div className="relative">
                <RxDotsVertical
                  className="menu-trigger cursor-pointer"
                  onClick={() => toggleMenu(parent.id)}
                />
                {activeMenuId === parent.id && parent.user_id === userId && (
                  <div className="menu-dropdown absolute right-0 z-10 mt-2 w-[70px] rounded-[5px] border border-[#E9E9E9] bg-white shadow-md">
                    <button
                      onClick={() => startEdit(parent)}
                      className="block w-full px-3 py-2 text-center text-[16px] font-medium text-black hover:bg-gray-100"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(parent.id)}
                      className="block w-full border-t border-[#E9E9E9] px-3 py-2 text-center text-[16px] font-medium text-black hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </header>

            {editingId === parent.id ? (
              <form
                onSubmit={submitEdit}
                className="flex gap-[10px] space-y-2 pl-[33px]"
              >
                <input
                  className="h-[60px] w-full grow-1 rounded-[10px] border border-[#D6D6D6] p-2"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />

                <button
                  type="submit"
                  className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                >
                  <GoPaperAirplane />
                </button>
                <button
                  className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                  onClick={() => setReplyTo(null)}
                >
                  <MdOutlineCancel />
                </button>
              </form>
            ) : (
              <div className="space-y-1 pl-[33px]">
                <p>{parent.body}</p>
                <button
                  onClick={() => setReplyTo(parent.id)}
                  className="mt-[20px] cursor-pointer text-[16px] font-medium text-[#6D6D6D]"
                >
                  답글
                </button>
              </div>
            )}

            <div className="mt-4 space-y-4 pl-8">
              {comments
                .filter((reply) => reply.parent_comment_id === parent.id)
                .map((reply) => (
                  <article
                    key={reply.id}
                    className="border-l-2 border-gray-200 pl-4"
                  >
                    <header className="relative mb-1 flex items-center gap-2 text-[#333]">
                      {reply.profile.image ? (
                        <img
                          src={reply.profile.image}
                          alt="profile"
                          className="h-[25px] w-[25px] rounded-full"
                        />
                      ) : (
                        <div className="h-[25px] w-[25px] rounded-full bg-black" />
                      )}
                      <span>{reply.profile.name}</span>
                      <time>{getElapsedTime(reply.created_at)}</time>

                      <div className="relative ml-auto">
                        <RxDotsVertical
                          className="menu-trigger cursor-pointer"
                          onClick={() => toggleMenu(reply.id)}
                        />
                        {activeMenuId === reply.id &&
                          reply.user_id === userId && (
                            <div className="menu-dropdown absolute right-0 z-10 mt-2 w-[70px] rounded-[5px] border border-[#E9E9E9] bg-white shadow-md">
                              <button
                                onClick={() => startEdit(reply)}
                                className="block w-full px-3 py-2 text-center text-[16px] font-medium text-black hover:bg-gray-100"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(reply.id)}
                                className="block w-full border-t border-[#E9E9E9] px-3 py-2 text-center text-[16px] font-medium text-black hover:bg-gray-100"
                              >
                                삭제
                              </button>
                            </div>
                          )}
                      </div>
                    </header>

                    {editingId === reply.id ? (
                      <form
                        onSubmit={submitEdit}
                        className="flex gap-[10px] space-y-2"
                      >
                        <input
                          className="ml-[22px] h-[60px] w-full grow-1 rounded-[10px] border border-[#D6D6D6] p-2"
                          value={editBody}
                          onChange={(e) => setEditBody(e.target.value)}
                        />

                        <button
                          type="submit"
                          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                        >
                          <GoPaperAirplane />
                        </button>
                        <button
                          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                          onClick={cancelEdit}
                        >
                          <MdOutlineCancel />
                        </button>
                      </form>
                    ) : (
                      <p className="mt-[15px] pl-[33px]">{reply.body}</p>
                    )}
                  </article>
                ))}

              {replyTo === parent.id && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, parent.id)}
                  className="mt-3 flex gap-[10px] space-y-2"
                >
                  <input
                    className="h-[60px] w-full grow-1 rounded-[10px] border border-[#D6D6D6] p-2"
                    placeholder="답글을 작성해 주세요."
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                  >
                    <GoPaperAirplane />
                  </button>
                  <button
                    className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-[10px] bg-[#F3F3F3] text-[24px]"
                    onClick={() => setReplyTo(null)}
                  >
                    <MdOutlineCancel />
                  </button>
                </form>
              )}
            </div>
          </article>
        ))}
    </section>
  );
}

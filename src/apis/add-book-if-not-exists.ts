import type { BookDetail } from '../types/book';
import supabase from '../utils/supabase';

export async function insertBookIfNotExists(bookData: BookDetail) {
  const bookForDB = {
    id: bookData.isbn13,
    title: bookData.title,
    author: bookData.author ?? null,
    description: bookData.description ?? null,
    cover: bookData.cover ?? null,
    categoryId: bookData.categoryId ?? null,
    categoryName: bookData.categoryName ?? null,
  };
  const { error } = await supabase.from('book').upsert([bookForDB], {
    onConflict: 'id',
    ignoreDuplicates: true,
  });

  if (error) {
    console.error('책 추가 중 에러 발생:', error.message);
  }
}

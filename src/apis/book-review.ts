import supabase from '../utils/supabase';

async function checkBookExists(bookId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('book')
    .select('id')
    .eq('id', bookId)
    .single();

  if (error) return false;
  return data !== null;
}

async function checkReviewExists(reviewId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('review')
    .select('id')
    .eq('id', reviewId)
    .single();

  if (error) return false;
  return data !== null;
}

export async function createReview(body: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error('유저 인증 실패');
  const { data, error } = await supabase
    .from('review')
    .insert([{ body, user_id: user.id }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function tagBookWithReview({
  bookId,
  reviewId,
  star,
}: {
  bookId: string;
  reviewId: string;
  star: number;
}) {
  const bookExists = await checkBookExists(bookId);
  if (!bookExists) throw new Error('유효하지 않은 bookId 입니다.');

  const reviewExists = await checkReviewExists(reviewId);
  if (!reviewExists) throw new Error('유효하지 않은 reviewId 입니다.');

  const { data, error } = await supabase
    .from('book_tag')
    .insert([
      {
        book_id: bookId,
        reference_id: reviewId,
        reference_category: 'review',
        star: star,
      },
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function submitReview({
  bookId,
  body,
  star,
}: {
  bookId: string;
  body: string;
  star: number;
}) {
  const review = await createReview(body);

  const bookTag = await tagBookWithReview({
    bookId,
    reviewId: review.id,
    star,
  });

  return { review, bookTag };
}

export async function fetchReviewsWithStars(
  bookId: string,
  from: number,
  to: number,
) {
  const { data: tags, error: tagError } = await supabase
    .from('book_tag')
    .select('*')
    .eq('book_id', bookId)
    .eq('reference_category', 'review')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (tagError) throw tagError;
  if (!tags.length) return [];

  const reviewIds = tags.map((tag) => tag.reference_id);

  const { data: reviews, error: reviewError } = await supabase
    .from('review')
    .select('id, body, created_at')
    .in('id', reviewIds);

  if (reviewError) throw reviewError;

  return tags.map((tag) => {
    const review = reviews.find((r) => r.id === tag.reference_id);
    return {
      id: tag.id,
      review: review?.body || '',
      date: review?.created_at || '',
      rating: tag.star ?? 0,
    };
  });
}

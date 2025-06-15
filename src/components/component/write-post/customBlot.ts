import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed') as any;

interface DetailBookData {
  bookId: string;
  imgSrc: string;
  title: string;
  author: string;
  rating: string;
}

class DetailBookBlot extends BlockEmbed {
  static blotName = 'detailBook';
  static tagName = 'div';
  static className = 'detailBook';

  static create(value: DetailBookData) {
    const node = super.create() as HTMLElement;
    node.classList.add('detailBook');

    node.innerHTML = `
      <div class="imageWrapper">
        <img src="${value.imgSrc}" data-bookid="${value.bookId}" alt="${value.title}"  class="bookImage" />
      </div>
      <div class="infoWrapper"> 
        <p class="bookTitle">${value.title}</p>
        <p class="bookAuthor">${value.author}</p>
      </div>
    `;

    return node;
  }

  static value(node: HTMLElement): DetailBookData {
    const img = node.querySelector('img');
    const title = node.querySelector('.bookTitle')?.textContent || '';
    const author = node.querySelector('.bookAuthor')?.textContent || '';
    const rating = node.querySelector('.bookRating')?.textContent || '';

    return {
      bookId: img?.getAttribute('data-bookid') || '',
      imgSrc: img?.getAttribute('src') || '',
      title,
      author,
      rating,
    };
  }
}

Quill.register(DetailBookBlot);

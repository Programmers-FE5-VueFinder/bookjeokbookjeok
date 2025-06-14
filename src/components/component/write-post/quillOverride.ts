import ReactQuill from 'react-quill-new';
import { fontsize } from './quillAttribute';
const Quill = ReactQuill.Quill;

const Size = Quill.import('formats/size') as any;
Size.whitelist = fontsize;
Quill.register(Size, true);
export { Size };

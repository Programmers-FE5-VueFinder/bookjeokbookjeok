import Quill from 'quill';
import { fontsize } from './quillAttribute';

const FontSizeStyle = Quill.import('attributors/style/size') as any;
FontSizeStyle.whitelist = fontsize;
Quill.register(FontSizeStyle, true);

export {};

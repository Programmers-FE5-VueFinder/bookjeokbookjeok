import Quill from 'quill';
import { fontsize, palette } from './quillAttribute';

const Size = Quill.import('attributors/style/size') as any;
Size.whitelist = fontsize;
Quill.register(Size, true);

const Color = Quill.import('attributors/style/color') as any;
Color.whitelist = palette;
Quill.register(Color, true);

console.log(Color.whitelist, Size.whitelist);

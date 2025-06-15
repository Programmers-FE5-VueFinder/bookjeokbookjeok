import { fontsize, palette } from './quillAttribute.ts';

export default function CustomToolBar({
  category,
}: {
  category: string | undefined;
}) {
  return (
    <>
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <select className="ql-color" defaultValue={palette[0]}>
            {palette.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-image" />
        </span>
        <span className="ql-formats">
          <select className="ql-size" defaultValue="16px">
            {fontsize.map((size) => (
              <option key={size} value={size}>
                {size.replace('px', '')}pt
              </option>
            ))}
          </select>
        </span>
        <button
          type="button"
          className="ql-searchbook"
          style={{ visibility: category === 'diary' ? 'visible' : 'hidden' }}
        >
          도서찾기
        </button>
      </div>
    </>
  );
}

export default function CustomToolBar({
  category,
  setShowModal,
}: {
  category: string | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-image" />
        </span>
        <span className="ql-formats">
          <select className="ql-size" defaultValue="medium">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
        </span>
        {category === 'diary' && (
          <button
            type="button"
            className="searchbook"
            onClick={() => setShowModal(true)}
          >
            도서찾기
          </button>
        )}
      </div>
    </>
  );
}

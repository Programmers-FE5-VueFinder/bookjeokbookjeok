import SignUpModal from '../components/common/SignUpModal';

export default function Sign() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <SignUpModal />
      </div>
    </>
  );
}

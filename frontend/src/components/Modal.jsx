const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed w-full inset-0 flex items-center justify-center z-50 transition">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute w-2/3 md:w-1/3 top-[40%] left-[20%] md:left-[35%] bg-white p-4 rounded-lg z-10 text-right">
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none "
              onClick={onClose}
            >
              ✕
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;

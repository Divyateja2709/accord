import { useState, useEffect } from "react";
import AgreementHtml from "../AgreementHtml";
import useAppStore from "../store/store";
import { FaExpand } from "react-icons/fa";

const FullScreenModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const textColor = useAppStore((state) => state.textColor);
  const backgroundColor = useAppStore((state) => state.backgroundColor);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .custom-modal-content {
        background-color: ${backgroundColor} !important;
        color: ${textColor} !important;
      }
      .custom-modal-header {
        background-color: ${backgroundColor} !important;
        color: ${textColor} !important;
      }
      .custom-modal-title {
        color: ${textColor} !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [textColor, backgroundColor]);

  return (
    <div className="flex items-center justify-end text-right text-sm text-gray-700 preview-element">
      <FaExpand
        className="text-2xl cursor-pointer m-1 hover:text-teal-400 transition-transform transform hover:scale-110"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 rounded-lg shadow-lg"
            style={{ backgroundColor, color: textColor }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Output</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-red-500 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto max-h-[70vh]">
              <AgreementHtml loading={false} isModal={true} />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullScreenModal;

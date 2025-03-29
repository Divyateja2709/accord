import { MdExplore } from "react-icons/md";
import { FaCircleQuestion } from "react-icons/fa6";
import tour from "../components/Tour";

const FloatingFAB = () => {
  const startTourEvent = () => {
    void tour.start();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end space-y-3">
      {/* Action Button */}
      <button
        onClick={startTourEvent}
        className="w-14 h-14 bg-gray-700 text-white rounded-full shadow-md flex justify-center items-center text-2xl transition-transform duration-200 hover:scale-110"
      >
        <MdExplore />
      </button>

      {/* Main FAB Button */}
      <button
        onClick={startTourEvent}
        className="w-16 h-16 bg-darkBlue text-white rounded-full shadow-lg flex justify-center items-center text-3xl transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <FaCircleQuestion />
      </button>
    </div>
  );
};

export default FloatingFAB;

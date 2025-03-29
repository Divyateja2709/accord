import { useCallback, useMemo, useState } from "react";
import useAppStore from "../store/store";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { FaChevronDown } from "react-icons/fa";

interface SampleDropdownProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SampleDropdown: React.FC<SampleDropdownProps> = ({ setLoading }) => {
  const { samples, loadSample } = useStoreWithEqualityFn(
    useAppStore,
    (state) => ({
      samples: state.samples,
      loadSample: state.loadSample as (key: string) => Promise<void>,
    }),
    shallow
  );

  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Prepare items from sample data
  const items = useMemo(
    () =>
      samples?.map((s) => ({
        label: s.NAME,
        key: s.NAME,
      })) || [],
    [samples]
  );

  // Handle item selection
  const handleMenuClick = useCallback(
    async (key: string) => {
      if (key) {
        setLoading(true);
        try {
          await loadSample(key);
          setSelectedSample(key);
        } catch (error) {
          console.error("Failed to load sample:", error);
        } finally {
          setLoading(false);
        }
      }
    },
    [loadSample, setLoading]
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none"
        role="button"
        aria-expanded={isOpen}
      >
        {selectedSample || "Load Sample"} <FaChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                handleMenuClick(item.key);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SampleDropdown;

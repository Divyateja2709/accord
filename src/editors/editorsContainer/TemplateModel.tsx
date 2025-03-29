import ConcertoEditor from "../ConcertoEditor";
import useAppStore from "../../store/store";
import useUndoRedo from "../../components/useUndoRedo";

import { FaUndo, FaRedo } from "react-icons/fa";

function TemplateModel() {
  const textColor = useAppStore((state) => state.textColor);
  const editorModelCto = useAppStore((state) => state.editorModelCto);
  const setEditorModelCto = useAppStore((state) => state.setEditorModelCto);
  const setModelCto = useAppStore((state) => state.setModelCto);
  const { value, setValue, undo, redo } = useUndoRedo(
    editorModelCto,
    setEditorModelCto,
    setModelCto // Sync to main state and rebuild
  );

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value); // Update editor state and sync
      setModelCto(value);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h3
          className="text-lg font-semibold"
          style={{ color: textColor || "#000" }}
        >
          Concerto Model
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            title="Undo"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaUndo className="text-base" style={{ color: textColor }} />
          </button>
          <button
            onClick={redo}
            title="Redo"
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaRedo className="text-base" style={{ color: textColor }} />
          </button>
        </div>
      </div>

      {/* Tooltip/Description */}
      <span
        className="text-sm italic"
        style={{ color: textColor || "#333" }}
      >
        Defines the data model for the template and its logic.
      </span>

      {/* Concerto Editor */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <ConcertoEditor value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default TemplateModel;

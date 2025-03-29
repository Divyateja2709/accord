import MarkdownEditor from "../MarkdownEditor";
import useAppStore from "../../store/store";
import useUndoRedo from "../../components/useUndoRedo";
import { FaUndo, FaRedo } from "react-icons/fa";

function TemplateMarkdown() {
  const textColor = useAppStore((state) => state.textColor);
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const editorValue = useAppStore((state) => state.editorValue);
  const setEditorValue = useAppStore((state) => state.setEditorValue);

  const { value, setValue, undo, redo } = useUndoRedo(
    editorValue,
    setEditorValue
  );

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value); // Update editor state and sync
    }
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-xl shadow-md"
      style={{ backgroundColor }}
    >
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h3
          className="text-lg font-semibold"
          style={{ color: textColor || "#000" }}
        >
          TemplateMark
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

      {/* Description */}
      <p className="text-sm" style={{ color: textColor || "#333" }}>
        A natural language template with embedded variables, conditional
        sections, and TypeScript code.
      </p>

      {/* Markdown Editor */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <MarkdownEditor value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default TemplateMarkdown;

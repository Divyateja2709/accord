import JSONEditor from "../JSONEditor";
import useAppStore from "../../store/store";
import useUndoRedo from "../../components/useUndoRedo";
import { FaUndo, FaRedo } from "react-icons/fa";

function AgreementData() {
  const textColor = useAppStore((state) => state.textColor);
  const editorAgreementData = useAppStore(
    (state) => state.editorAgreementData
  );
  const setEditorAgreementData = useAppStore(
    (state) => state.setEditorAgreementData
  );

  const { value, setValue, undo, redo } = useUndoRedo(
    editorAgreementData,
    setEditorAgreementData
  );

  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value); // Update editor state and sync
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: textColor }}>
          Data
        </h3>
        <div className="flex items-center gap-2">
          <FaUndo
            onClick={undo}
            title="Undo"
            className="cursor-pointer hover:text-gray-500"
            style={{ color: textColor }}
          />
          <FaRedo
            onClick={redo}
            title="Redo"
            className="cursor-pointer hover:text-gray-500"
            style={{ color: textColor }}
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm" style={{ color: textColor }}>
        JSON data (an instance of the Concerto model) used to preview output
        from the template.
      </p>

      {/* JSON Editor */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <JSONEditor value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default AgreementData;

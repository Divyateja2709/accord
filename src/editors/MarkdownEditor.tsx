import { lazy, Suspense, useMemo, useCallback, useEffect } from "react";
import useAppStore from "../store/store";
import { useMonaco } from "@monaco-editor/react";

const MonacoEditor = lazy(() =>
  import("@monaco-editor/react").then((mod) => ({ default: mod.Editor }))
);

interface MarkdownEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const backgroundColor = useAppStore((state) => state.backgroundColor);
  const textColor = useAppStore((state) => state.textColor);
  const monaco = useMonaco();

  // Set theme based on backgroundColor
  const themeName = useMemo(
    () => (backgroundColor === "#FFFFFF" ? "lightTheme" : "darkTheme"),
    [backgroundColor]
  );

  // Define and apply themes in Monaco
  useEffect(() => {
    if (monaco) {
      const defineTheme = (name: string, base: "vs" | "vs-dark") => {
        monaco.editor.defineTheme(name, {
          base,
          inherit: true,
          rules: [],
          colors: {
            "editor.background": backgroundColor || "#1E1E1E",
            "editor.foreground": textColor || "#D4D4D4",
            "editor.lineHighlightBorder": "#EDE8DC",
          },
        });
      };

      defineTheme("lightTheme", "vs");
      defineTheme("darkTheme", "vs-dark");

      monaco.editor.setTheme(themeName);
    }
  }, [monaco, backgroundColor, textColor, themeName]);

  // Editor options
  const editorOptions = {
    minimap: { enabled: false },
    wordWrap: "on" as const,
    automaticLayout: true,
    scrollBeyondLastLine: false,
  };

  // Handle changes in editor content
  const handleChange = useCallback(
    (val: string | undefined) => {
      if (onChange) onChange(val);
    },
    [onChange]
  );

  return (
    <div className="w-full h-[60vh] border-2 border-gray-200 rounded-lg">
      <Suspense
        fallback={<div className="text-center text-gray-500">Loading Editor...</div>}
      >
        <MonacoEditor
          options={editorOptions}
          language="markdown"
          height="60vh"
          value={value}
          onChange={handleChange}
          theme={themeName}
        />
      </Suspense>
    </div>
  );
};

export default MarkdownEditor;

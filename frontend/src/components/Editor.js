import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: [
    "bold",
    "italic",
    "link",
    "unlink",
    "underline",
    "source",
    "|",
    "ul",
    "ol",
    "|",
    "indent",
    "outdent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "align",
    "|",
    "undo",
    "redo",
    "|",
  ],
  readonly: false,
  toolbarAdaptive: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: "insert_clear_html",
  spellcheck: true,
  toolbarSticky: false,
  height: 300,
  minHeight: 300,
  maxHeight: 300,
  toolbarButtonSize: "middle",
  showTooltip: true,
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  toolbar: true,
};

const Editor = ({ value, onChange }) => {
  const editor = useRef(null);
  const contentChange = (content) => {
    onChange(content);
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={contentChange}
    />
  );
};

export default Editor;

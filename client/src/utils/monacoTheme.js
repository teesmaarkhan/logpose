export const handleEditorWillMount = (monaco) => {
  monaco.editor.defineTheme("draculaPro", {
    base: "vs-dark",

    inherit: true,

    rules: [
      {
        token: "comment",
        foreground: "54d354",
        fontStyle: "italic",
      },
      {
        token: "keyword",
        foreground: "c678dd",
      },
      {
        token: "string",
        foreground: "8CFAA6",
      },
      {
        token: "number",
        foreground: "d19a66",
      },
      {
        token: "type",
        foreground: "8be9fd",
      },
      {
        token: "boolean",
        foreground: "d19a66",
      },
    ],

    colors: {
      "editor.background": "#15191d",
      "editor.foreground": "#f8f8f2",
      "editorLineNumber.foreground": "#565a7a",
      "editorCursor.foreground": "#ffffff",
      "editor.selectionBackground": "#44475a",
    },
  });
};

import Editor from "@/editor";

let globalEditor: Editor;

export const setGlobalEditor = (editor) => {  
  globalEditor = editor;
}

export const getGlobalEditor = () => {
  return globalEditor;
}
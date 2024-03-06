import { createContext } from 'react';
import { fabric } from 'fabric';
import Editor from '@/editor';
export interface IGloablStateContext {
  object?: fabric.Object | fabric.Textbox | null | undefined;
  setActiveObject?: (o: fabric.Object) => void;
  isReady?: boolean;
  setReady?: (o: boolean) => void;
  fxType?: string;
  setFxType?: (t: string) => void;
  editor?: Editor;
}

export const GloablStateContext = createContext<IGloablStateContext>(null);
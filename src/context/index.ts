import { createContext } from 'react';
import { fabric } from 'fabric';
import Editor from '@/editor';
export interface IGloablStateContext {
  object?: fabric.Object | null | undefined;
  setActiveObject?: (o: fabric.Object) => void;
  isReady?: boolean;
  setReady?: (o: boolean) => void;
  editor?: Editor;
  roughSvg?: any;
}

export const GloablStateContext = createContext<IGloablStateContext>(null);
import fabric from 'fabric';
import { FABRITOR_CUSTOM_PROPS, SKETCH_ID } from '@/utils/constants';
import Editor from '.';
// https://github.com/alimozdemir/fabric-history/blob/master/src/index.js

export default class FabricHistory {
  private historyUndo: string[];
  private historyRedo: string[];
  private currentState: string;
  public historyProcessing: boolean;
  private canvas: fabric.Canvas;
  private editor: Editor;

  constructor (editor) {
    this.historyUndo = [];
    this.historyRedo = [];
    this.canvas = editor.canvas;
    this.editor = editor;
    this.historyProcessing = false;
    this.currentState = this._getJSON();
    this.init();
  }

  private _checkHistoryUndoLength () {
    if (this.historyUndo.length > 100) {
      this.historyUndo.shift();
    }
  }

  private _checkHistoryRedoLength () {
    if (this.historyRedo.length > 100) {
      this.historyRedo.shift();
    }
  }

  public _historySaveAction () {
    if (this.historyProcessing) return;
    const json = this.currentState;
    this.historyUndo.push(json);
    this._checkHistoryUndoLength();
    const curJson = this._getJSON();
    this.currentState = curJson;
  }

  private _getJSON () {
    return JSON.stringify(this.editor.canvas2Json());
  }

  private _historyEvents () {
    return {
      'object:added': (opt) => {  
        const { target } = opt;
        if (target && target.id !== SKETCH_ID) {
          this._historySaveAction();
        }
      },
      'object:removed': this._historySaveAction.bind(this),
      'object:modified': (opt) => {
        const { target } = opt;
        if (target && target.id !== SKETCH_ID) {
          this._historySaveAction();
        }
      },
      'object:skewing': this._historySaveAction.bind(this),
      'fabritor:object:modified': this._historySaveAction.bind(this),
    };
  }

  private init () {
    this.canvas.on(this._historyEvents());
  }

  public dispose () {
    this.canvas.off(this._historyEvents());
  }

  public async undo () {
    const _history = this.historyUndo.pop();
    if (_history) {
      this.historyProcessing = true;
      this.historyRedo.push(this.currentState);
      this._checkHistoryRedoLength();
      this.currentState = _history;
      await this.editor.loadFromJSON(_history);
      this.historyProcessing = false;
      this.canvas.fire('fabritor:history:undo');
    }
  }

  public async redo () {
    const _history = this.historyRedo.pop();
    if (_history) {
      this.historyProcessing = true;
      this.historyUndo.push(this.currentState);
      this._checkHistoryUndoLength();
      this.currentState = _history;
      await this.editor.loadFromJSON(_history);
      this.historyProcessing = false;
      this.canvas.fire('fabritor:history:redo');
    }
  }

  public clear () {
    this.historyRedo = [];
    this.historyUndo = [];
    this.historyProcessing = false;
  }
}
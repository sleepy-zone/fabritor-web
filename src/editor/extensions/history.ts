import fabric from 'fabric';
import Editor from '../';
import { MAX_HISTORY_LENGTH } from '@/config';

// https://github.com/alimozdemir/fabric-history/blob/master/src/index.js

// @TODO
// 对于 slider 类的配置，可以 onChangeEnd 触发历史记录，否则过于频繁

export default class FabricHistory {
  private historyUndo: string[];
  private historyRedo: string[];
  private saving: boolean; // if saving 2 history
  private doing: boolean;  // if doing undo or redo 
  private currentState: string;
  private canvas: fabric.Canvas;
  private editor: Editor;

  constructor (editor) {
    this.historyUndo = [];
    this.historyRedo = [];
    this.canvas = editor.canvas;
    this.editor = editor;

    this.saving = false;
    this.doing = false;

    this.currentState = this._getJSON();
    this.init();
  }

  private _checkHistoryUndoLength () {
    if (this.historyUndo.length > MAX_HISTORY_LENGTH) {
      this.historyUndo.shift();
    }
  }

  private _checkHistoryRedoLength () {
    if (this.historyRedo.length > MAX_HISTORY_LENGTH) {
      this.historyRedo.shift();
    }
  }

  public _historySaveAction () {
    if (this.doing || this.saving) return;
    this.saving = true;

    const json = this.currentState;
    this.historyUndo.push(json);
    this._checkHistoryUndoLength();
    this.currentState = this._getJSON();

    this.saving = false;
  }

  private _getJSON () {
    return JSON.stringify(this.editor.canvas2Json());
  }

  private _historyEvents () {
    return {
      'object:added': this._historySaveAction.bind(this),
      'object:removed': this._historySaveAction.bind(this),
      'object:modified': this._historySaveAction.bind(this),
      'object:skewing': this._historySaveAction.bind(this),
      'fabritor:object:modified': this._historySaveAction.bind(this)
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
      this.doing = true;

      this.historyRedo.push(this.currentState);
      this._checkHistoryRedoLength();
      this.currentState = _history;
      await this.editor.loadFromJSON(_history);

      this.doing = false;
      this.canvas.fire('fabritor:history:undo');
    }
  }

  public async redo () {
    const _history = this.historyRedo.pop();
    if (_history) {
      this.doing = true;

      this.historyUndo.push(this.currentState);
      this._checkHistoryUndoLength();
      this.currentState = _history;
      await this.editor.loadFromJSON(_history);

      this.doing = false;
      this.canvas.fire('fabritor:history:redo');
    }
  }

  public canUndo () {
    return this.historyUndo.length > 0;
  }

  public canRedo () {
    return this.historyRedo.length > 0;
  }

  public reset () {
    this.historyRedo = [];
    this.historyUndo = [];
    this.saving = false;
    this.doing = false;
    this.currentState = this._getJSON();
  }
}
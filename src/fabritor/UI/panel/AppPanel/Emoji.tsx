import { fabric } from 'fabric';
import { useLocale } from 'ice';
import AppSubPanel from './AppSubPanel';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { createTextbox } from '@/editor/objects/textbox';
import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';

export default function EmojiPanel (props) {
  const { back } = props;
  const { editor } = useContext(GloablStateContext);
  const { locale } = useLocale();
  const [emojiLocale, setEmojiLocale] = useState('en');

  const handleEmojiSelect = async (emoji) => {
    const object = editor.canvas.getActiveObject() as fabric.Textbox;
    if (object && object.type === 'textbox') {
      object.set('text', `${object.text}${emoji.native}`);
      editor.canvas.requestRenderAll();
    } else {
      await createTextbox({
        text: emoji.native,
        fontSize: 80,
        width: 100,
        canvas: editor.canvas
      });
    }
  }

  useEffect(() => {
    if (locale?.indexOf('en') === 0) {
      setEmojiLocale('en');
    } else if (locale?.indexOf('zh') === 0) {
      setEmojiLocale('zh');
    } else {
      setEmojiLocale(locale || 'en');
    }
  }, [locale]);

  return (
    <AppSubPanel title="Emoji" back={back}>
      <Picker
        data={data}
        perLine={8}
        set="native"
        locale={emojiLocale}
        emojiButtonSize={30}
        emojiSize={22}
        onEmojiSelect={handleEmojiSelect}
      />
    </AppSubPanel>
  )
}
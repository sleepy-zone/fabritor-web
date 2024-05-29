import { fabric } from 'fabric';
import { useSearchParams } from 'ice';
import AppSubPanel from './AppSubPanel';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { createTextbox } from '@/editor/objects/textbox';
import { useContext, useEffect, useState } from 'react';
import { GloablStateContext } from '@/context';

export default function EmojiPanel (props) {
  const { back } = props;
  const { editor } = useContext(GloablStateContext);
  const [searchParams] = useSearchParams();
  const lng = searchParams.get('lng') || 'en-US';
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
    if (lng?.indexOf('en') === 0) {
      setEmojiLocale('en');
    } else if (lng?.indexOf('zh') === 0) {
      setEmojiLocale('zh');
    } else {
      setEmojiLocale(lng || 'en');
    }
  }, [lng]);

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
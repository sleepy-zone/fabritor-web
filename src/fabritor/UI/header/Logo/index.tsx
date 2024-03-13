import { LOGO_ICON } from '@/assets/icon';
import { CenterV } from '@/fabritor/components/Center';
import { PANEL_WIDTH } from '@/config';

export default function Logo () {
  return (
    <CenterV gap={5} style={{ width: PANEL_WIDTH, paddingLeft: 16 }}>
      <img src={LOGO_ICON} style={{ width: 28 }} />
      <span style={{ fontWeight: 'bold', fontSize: 14 }}>
        fabritor, A creative editor based on fabricjs.
      </span>
    </CenterV>
  )
}
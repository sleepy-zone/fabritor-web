import { LOGO_ICON } from '@/assets/icon';
import { CenterV } from '@/fabritor/components/Center';

export default function Logo () {
  return (
    <CenterV gap={5} style={{ width: 420, paddingLeft: 16 }}>
      <img src={LOGO_ICON} style={{ width: 28 }} />
      <span style={{ fontWeight: 'bold', fontSize: 15 }}>
        fabritor, A creative editor based on fabricjs.
      </span>
    </CenterV>
  )
}
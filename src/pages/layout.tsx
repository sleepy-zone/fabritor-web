import { Outlet, useSearchParams } from 'ice';
import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import * as dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import type { Locale } from 'antd/es/locale';
import 'dayjs/locale/zh-cn';

export default function Layout() {
  const [searchParams] = useSearchParams();
  const lng = searchParams.get('lng') || 'en-US';
  const { i18n } = useTranslation();
  const [antDLocale, setAntDLocale] = useState<Locale>(enUS);

  useEffect(() => {
    if (lng === 'en-US') {
      setAntDLocale(enUS);
      dayjs.locale('en');
      i18n.changeLanguage('en-US');
    } else {
      setAntDLocale(zhCN);
      dayjs.locale('zh-cn');
      i18n.changeLanguage('zh-CN');
    }
  }, [lng]);

  return (
    <ConfigProvider locale={antDLocale}>
      <Outlet />
    </ConfigProvider>
  );
}
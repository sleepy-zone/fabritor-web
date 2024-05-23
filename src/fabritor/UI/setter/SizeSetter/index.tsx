import { InputNumber, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/i18n/utils';

const SizeInput = (props) => {
  const { t } = useTranslation();
  const { prefixText, ...rest } = props;
  
  return (
    <InputNumber
      prefix={
        <span
          style={{ color: 'rgba(0, 0, 0, 0.5)', marginRight: 4 }}
        >
          {prefixText || t('setter.size.width')}
        </span>
      }
      controls={false}
      changeOnBlur
      min={50}
      max={8000}
      style={{ flex: 1 }}
      {...rest}
    />
  )
}

// @TODO preset size
export default function SizeSetter (props) {
  const { t } = useTranslation();
  const { value, onChange } = props;
  const [innerValue, setInnerValue] = useState<number[]>([]);

  const handleChange = (v, index) => {
    const _innerValue = [...innerValue];
    _innerValue[index] = v;
    onChange?.(_innerValue);
  }

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <Flex gap={8}>
      <SizeInput value={innerValue?.[0]} onChange={(v) => { handleChange(v, 0) }} />
      <SizeInput prefixText={t('setter.size.height')} value={innerValue?.[1]} onChange={(v) => { handleChange(v, 1) }} />
    </Flex>
  )
}
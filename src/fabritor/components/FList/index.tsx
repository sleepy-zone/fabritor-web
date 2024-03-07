import { List } from 'antd';
import Center from '../Center';

export default function FList (props) {
  const { dataSource, renderItemChildren, ...rest } = props;
  return (
    <List
      dataSource={dataSource}
      renderItem={(item: any) => (
        <List.Item
          className="fabritor-list-item"
          style={{
            border: '2px solid transparent',
            padding: '10px 16px'
          }}
          onClick={() => { item?.onClick?.(item) }}
        >
          <Center style={{ height: 40 }}>
            {renderItemChildren(item)}
          </Center>
        </List.Item>
      )}
      {...rest}
    />
  )
}
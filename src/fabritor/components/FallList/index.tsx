import { Flex, Card } from 'antd';

export default function FallList (props) {
  const { list = [], itemClick, maxHeight, type } = props;
  const length = Math.ceil(list.length / 2);
  const nowList = [list.slice(0, length), list.slice(length)];

  const renderCards = (nowItem, key) => {
    if (type === 'image') {
      return (
        <Flex vertical gap={10} key={key}>
        {
          nowItem.map((item, index) => (
            <Card
              hoverable
              style={{ width: 140, boxShadow: 'none' }}
              bodyStyle={{ padding: 0 }}
              bordered={false}
              key={index}
              onClick={() => { itemClick && itemClick(item) }}
            >
              <img
                src={item.cover}
                style={{ width: '100%', borderRadius: 8 }}
              />
            </Card>
          ))
        }
        </Flex>
      )
    }
    return (
      <Flex vertical gap={10} key={key}>  
      {
        nowItem.map((item, index) => (
          <Card
            hoverable
            style={{ width: 140 }}
            key={index}
            cover={
              <img
                src={item.cover}
              />
            }
            onClick={() => { itemClick && itemClick(item) }}
          >
            { item.title ? <Card.Meta description={item.title} /> : null }
          </Card>
        ))
      }
      </Flex>
    )
  }

  if (!list.length) return null;

  return (
    <Flex gap={10} wrap="wrap" justify="space-around">
      {
        nowList.map((nowItem, index) => renderCards(nowItem, index))
      }
    </Flex>
  )
}
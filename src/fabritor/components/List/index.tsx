export default function FList () {
  return (
    <List
        dataSource={TEXT_ADVANCE_CONFIG}
        renderItem={(item: any) => (
          <List.Item
            className="fabritor-panel-layer-item"
            style={{
              border: '2px solid transparent',
              padding: '10px 16px'
            }}
            onClick={() => { handleTextAdvanceConfigClick(item) }}
          >
            <Center style={{ height: 40 }}>
              {item.icon}
              <span style={{ fontSize: 16, fontWeight: 'bold', margin: '0 6px 0 10px' }}>
                {item.label}
              </span>
              <RightOutlined />
            </Center>
          </List.Item>
        )}
      />
  )
}
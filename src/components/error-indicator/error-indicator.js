import React from 'react'
import { Alert, Space } from 'antd'

const ErrorIndicator = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', padding: 16 }}>
      <Alert
        message="Error"
        description="Что-то пошло не так. Попробуйте перезагрузить страницу"
        type="error"
        closable
      />
    </Space>
  )
}

export default ErrorIndicator

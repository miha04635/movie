import React from 'react'
import { Alert, Space } from 'antd'

import './error-indicator.css'

const ErrorIndicator = () => {
  return (
    <Space direction="vertical" className="space">
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

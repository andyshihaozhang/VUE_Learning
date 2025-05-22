// 组件 Props 类型
declare interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

// 组件事件类型
declare interface ButtonEvents {
  onClick: (event: MouseEvent) => void
}
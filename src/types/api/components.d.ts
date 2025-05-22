// ��� Props ����
declare interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

// ����¼�����
declare interface ButtonEvents {
  onClick: (event: MouseEvent) => void
}
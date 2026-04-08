import React from 'react'

type Variant = 'primary' | 'success' | 'danger' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  active?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'border-none bg-primary text-white enabled:hover:bg-primary-hover disabled:bg-border disabled:text-text-muted disabled:cursor-default',
  success:
    'border-none bg-success text-white enabled:hover:bg-green-700 disabled:bg-border disabled:text-text-muted disabled:cursor-default',
  danger: 'border-none bg-danger text-white enabled:hover:bg-red-700',
  outline: 'border border-border bg-white text-text enabled:hover:bg-gray-100',
  ghost:
    'border border-dashed border-gray-300 bg-transparent text-gray-500 enabled:hover:border-gray-400 enabled:hover:text-gray-700',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-md',
}

export default function Button({
  variant = 'outline',
  size = 'md',
  active,
  className = '',
  ...props
}: Props) {
  const activeClass =
    active !== undefined
      ? active
        ? 'bg-primary text-white border-primary enabled:hover:bg-primary-hover'
        : ''
      : ''

  return (
    <button
      className={`rounded-md cursor-pointer ${sizeClasses[size]} ${
        activeClass || variantClasses[variant]
      } ${className}`}
      {...props}
    />
  )
}

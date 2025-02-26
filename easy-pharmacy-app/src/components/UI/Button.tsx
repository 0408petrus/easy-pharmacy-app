type ButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ onClick, label, className, disabled }: ButtonProps) {
  return (
    <button
      className={"bg-blue-500 text-white rounded-md py-1 px-3 cursor-pointer " + className}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
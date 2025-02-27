type ButtonProps = {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ onClick, label, className, disabled }: ButtonProps) {
  return (
    <button
      className={
        `bg-blue-500 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed ` + 
        className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
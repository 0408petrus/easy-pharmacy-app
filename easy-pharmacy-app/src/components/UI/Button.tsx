type ButtonProps = {
    label: string;
    className?: string;
    onClick?: () => void;
  }
  
  export default function Button({ onClick, label, className }: ButtonProps) {
    return (
      <button
        className={"bg-blue-500 text-white rounded-md py-1 px-3 cursor-pointer " + className}
        onClick={onClick}
      >
        {label}
      </button>
    )
  }
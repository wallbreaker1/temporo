interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles = `px-6 py-3 rounded-lg font-semibold transition duration-300 inline-flex items-center justify-center ${className}`;

  const variants = {
    primary: "bg-[#D2A55D] text-black hover:bg-[#A17D35] font-medium",
    secondary:
      "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500",
    accent: "bg-purple-600 text-white hover:bg-purple-700",
  };

  const styles = `${baseStyles} ${variants[variant]}`;

  return href ? (
    <a href={href} className={styles}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

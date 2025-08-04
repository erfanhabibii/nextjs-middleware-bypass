import Link from "next/link";

type Model = "primary" | "secondary" | "tertiary" | "quaternary";
const models: Record<Model, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-500 text-white text-lg hover:text-primary p-2 rounded-lg transition-all disabled:bg-gray-500 disabled:animate-pulse",
  secondary: "bg-white dark:bg-quaternary text-quaternary dark:text-white",
  tertiary: "border border-white dark:border-quaternary text-white dark:text-quaternary",
  quaternary: "",
};
type CursorType = "pointer" | "default" | "auto" | "text";
const cursorClasses: Record<CursorType, string> = {
  pointer: "cursor-pointer",
  default: "cursor-default",
  auto: "cursor-auto",
  text: "cursor-text",
};
type BaseProps = {
  text: string;
  model: Model;
  onClick?: React.MouseEventHandler<HTMLElement>;
  classes?: React.HTMLAttributes<HTMLElement>["className"];
  href?: string;
  svgClasess?: string;
  disabled?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset";
  cursorType: CursorType;
};
type SvgRequiredProps = {
  prevSvg?: string;
  nextSvg?: string;
  svgSize: number;
};
type SvgOptionalProps = {
  prevSvg?: undefined;
  nextSvg?: undefined;
  svgSize?: never;
};
type Props = BaseProps & (SvgRequiredProps | SvgOptionalProps);

const Button = ({
  text,
  model,
  onClick,
  classes,
  href,
  prevSvg,
  svgSize,
  nextSvg,
  svgClasess,
  disabled,
  id,
  type,
  cursorType,
}: Props) => {
  const modelProp = models[model];
  const cursorClass = cursorClasses[cursorType];

  const renderSvg = (svg: string) => (
    <svg className={`w-${svgSize} h-${svgSize} ${svgClasess} select-none`}>
      <use href={`#${svg}`}></use>
    </svg>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`h-[42px]  px-6 cursor-pointer rounded-3xl inline-flex items-center justify-center gap-1 ${modelProp} ${classes}`}
      >
        {prevSvg && renderSvg(prevSvg)}
        {text}
        {nextSvg && renderSvg(nextSvg)}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`h-[42px]  px-6 rounded-3xl inline-flex items-center justify-center gap-1 ${cursorClass} ${modelProp} ${classes}`}
      disabled={disabled}
      type={type}
      id={id}
    >
      {prevSvg && renderSvg(prevSvg)}
      {text}
      {nextSvg && renderSvg(nextSvg)}
    </button>
  );
};

export default Button;

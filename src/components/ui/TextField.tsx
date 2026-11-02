import { useId, type ChangeEvent } from "react";
import { controlClass, Field } from "@/components/booking/FormControls";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  multiline?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  multiline,
  required,
  error,
  className,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    value,
    required,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(controlClass, multiline && "min-h-32 resize-y"),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
  };

  return (
    <Field
      label={required ? `${label} *` : label}
      htmlFor={id}
      className={className}
    >
      {multiline ? (
        <textarea rows={5} {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </Field>
  );
}

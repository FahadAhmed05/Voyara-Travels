"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import type { SelectOption } from "@/types";
import { cn } from "@/lib/utils";

export const controlClass =
  "w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-teal/50 disabled:cursor-not-allowed disabled:bg-mist disabled:text-body/60";

export function Field({
  label,
  htmlFor,
  labelId,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  labelId?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        id={labelId}
        htmlFor={htmlFor}
        className="text-xs font-bold tracking-wide text-ink/70 uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

interface SelectFieldProps<T extends string> {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

/**
 * A custom listbox in place of the browser's native menu: the same WAI-ARIA
 * combobox pattern (arrows, Home/End, type-ahead, Enter/Space, Escape), with a
 * menu that matches the brand and flips upward when there is no room below.
 */
export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: SelectFieldProps<T>) {
  const id = useId();
  const listId = `${id}-list`;
  const labelId = `${id}-label`;
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const [active, setActive] = useState(selectedIndex);
  const typed = useRef({ text: "", at: 0 });

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${id}-opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  const show = () => {
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) {
      setFlip(window.innerHeight - rect.bottom < 300 && rect.top > 300);
    }
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus();
  };

  const move = (next: number) =>
    setActive(Math.min(Math.max(next, 0), options.length - 1));

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        show();
      }
      return;
    }
    if (key === "ArrowDown") move(active + 1);
    else if (key === "ArrowUp") move(active - 1);
    else if (key === "Home") move(0);
    else if (key === "End") move(options.length - 1);
    else if (key === "Enter" || key === " ") choose(active);
    else if (key === "Escape") setOpen(false);
    else if (key === "Tab") setOpen(false);
    else if (key.length === 1) {
      const now = Date.now();
      typed.current.text =
        now - typed.current.at > 600 ? key : typed.current.text + key;
      typed.current.at = now;
      const hit = options.findIndex((option) =>
        option.label.toLowerCase().startsWith(typed.current.text.toLowerCase()),
      );
      if (hit >= 0) move(hit);
    } else return;
    if (key !== "Tab") event.preventDefault();
  };

  return (
    <Field label={label} htmlFor={id} labelId={labelId} className={className}>
      <div ref={wrap} className="relative">
        <button
          ref={trigger}
          id={id}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${id}`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          onClick={() => (open ? setOpen(false) : show())}
          onKeyDown={onKeyDown}
          className={cn(
            controlClass,
            "flex items-center justify-between gap-3 text-left",
            open && "border-teal ring-2 ring-teal/20",
          )}
        >
          <span className="truncate">{options[selectedIndex]?.label}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-teal transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
        {open ? (
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            data-lenis-prevent
            className={cn(
              "absolute z-50 max-h-64 w-full animate-pop overflow-auto rounded-2xl bg-white p-1.5 shadow-lift ring-1 ring-ink/10",
              flip ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            {options.map((option, index) => {
              const selected = index === selectedIndex;
              return (
                <li
                  key={option.value}
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    index === active ? "bg-mist text-ink" : "text-body",
                    selected && "font-bold text-teal-dark",
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {selected ? (
                    <Check
                      className="size-4 shrink-0 text-teal"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Field>
  );
}

interface DateFieldProps {
  label: string;
  value: string;
  min?: string;
  disabled?: boolean;
  errorId?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DateField({
  label,
  value,
  min,
  disabled,
  errorId,
  onChange,
  className,
}: DateFieldProps) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} className={className}>
      <input
        id={id}
        type="date"
        value={value}
        min={min}
        disabled={disabled}
        aria-describedby={errorId}
        aria-invalid={errorId ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={controlClass}
      />
    </Field>
  );
}

import clsx from "clsx";
import { isFuture } from "date-fns";
import { forwardRef } from "react";

const DateInput = forwardRef(function DateInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
    noFuture?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  },
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { noFuture, label, className, spanClassName, inputClassName, ...rest } =
    props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!noFuture) {
      return;
    }

    // ensure date is not in the future
    try {
      const date = new Date(evt.target.value);

      if (date.toString() === "Invalid Date") {
        return;
      }

      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const el = evt.target as HTMLInputElement;

      if (isFuture(date)) {
        el.setCustomValidity("Date cannot be in the future");
        el.reportValidity();
        return;
      }

      el.setCustomValidity("");
    } catch {
      //
    }
  };

  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-fg", spanClassName)}>
        {label}
        {props.required ? "*" : null}
      </span>
      <input
        ref={ref}
        {...rest}
        onChange={handleChange}
        type="date"
        className={clsx(
          "bg-bg0 mt-1 block w-full rounded-md border-border focus:bg-white focus:ring-0 disabled:bg-disabled",
          inputClassName,
        )}
      />
    </label>
  );
});

export default DateInput;

import { FormEvent, KeyboardEvent } from "react";

export const useMask = (mask: string) => {
  let oldValue: string;
  let oldCursor: number;

  const regex = new RegExp(`^[0-9${mask.replace(/#/g, "")}]*$`);

  const maskValue = (value: string): string => {
    const output = [];
    let maskIndex = 0;

    for (let i = 0; i < value.length; i++) {
      if (mask[maskIndex] !== "#") {
        output.push(mask[maskIndex]);
        maskIndex++;
      }
      output.push(value[i]);
      maskIndex++;
    }

    return output.join("");
  };

  const unmaskValue = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  const checkSeparator = (position: number, interval: number): number => {
    return Math.floor(position / (interval + 1));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    oldValue = event.currentTarget.value;
    oldCursor = event.currentTarget.selectionStart ?? 0;
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    let newCursorPosition: number = 0;
    let newValue = unmaskValue(el.value);

    const maskLength = mask.split("").filter((c) => c === "#").length;

    if (newValue.match(regex) && newValue.length <= maskLength) {
      newValue = maskValue(newValue);

      newCursorPosition =
        oldCursor -
        checkSeparator(
          oldCursor,
          mask.split("").filter((c) => c !== "#").length
        ) +
        checkSeparator(
          oldCursor + (newValue.length - oldValue.length),
          mask.split("").filter((c) => c !== "#").length
        ) +
        (unmaskValue(newValue).length - unmaskValue(oldValue).length);

      el.value = newValue;
    } else {
      el.value = oldValue;
      newCursorPosition = oldCursor;
    }
    el.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  return {
    onKeyDown,
    onInput,
  };
};

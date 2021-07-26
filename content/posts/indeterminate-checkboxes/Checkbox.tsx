import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * If `true`, the checkbox is checked. If `false`, the checkbox is not
   * checked. If left undefined, the checkbox is uncontrolled.
   * @see https://reactjs.org/docs/glossary.html#controlled-vs-uncontrolled-components
   */
  checked?: boolean;

  /**
   * If `true`, the checkbox gives an appearance of being in an indetermined
   * state.
   */
  indeterminate?: boolean;

  /**
   * Do not pass in a `type` prop. We force the input to be type "checkbox".
   */
  type?: never;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate = false, type, ...inputProps }, ref) => {
    // We need our own internal ref to ensure that it is (a) actually defined,
    // and (b) an object ref rather than a callback ref.
    const internalRef = useRef<HTMLInputElement | null>(null);

    // This function is a callback ref that will keep our internal ref and the
    // forwarded parent ref synchronized.
    function synchronizeRefs(el: HTMLInputElement | null) {
      // Update the internal ref.
      internalRef.current = el;

      // Update the provided ref.
      if (!ref) {
        // nothing to update
      } else if (typeof ref === "object") {
        ref.current = el;
      } else {
        // must be a callback ref
        ref(el);
      }
    }

    // We use an effect here to update the `indeterminate` IDL attribute on the
    // input element whenever the prop value changes.
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return <input ref={synchronizeRefs} type="checkbox" {...inputProps} />;
  }
);

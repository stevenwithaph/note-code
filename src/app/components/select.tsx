import { PropsWithChildren } from 'react';

interface Props {
  value: string | undefined;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function Select(props: PropsWithChildren<Props>) {
  return (
    <select
      className="btn"
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {props.children}
    </select>
  );
}

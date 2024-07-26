import { PropsWithChildren } from 'react';

interface Props {
  onClick?: () => void;
}

export function Button(props: PropsWithChildren<Props>) {
  return (
    <button type="submit" onClick={props.onClick} className="btn">
      {props.children}
    </button>
  );
}

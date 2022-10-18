import { HTMLProps } from 'react';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({ className, active, disabled, children, ...otherProps }: Props) {
    if (disabled) {
        return <span className={'customClassName'}>{children}</span>;
    }

    return (
        <a className={'customClassName'} aria-current={active ? 'page' : undefined} {...otherProps}>
            {children}
        </a>
    );
}

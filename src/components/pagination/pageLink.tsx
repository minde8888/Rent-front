import { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLAnchorElement> {
    nextPage?: string;
    previousPage?: string;
    // active: { active?: boolean };
}

export default function PageLink({ nextPage, previousPage, className, disabled, children, ...otherProps }: Props) {
    console.log(nextPage);
    if (disabled) {
        return <span className={'customClassName'}>{children}</span>;
    }

    return (
        <a className={'customClassName'} {...otherProps}>
            {children}
        </a>
    );
}

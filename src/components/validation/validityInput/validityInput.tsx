import React from 'react';

import { isValid } from './utility';

export interface IValidityInformerProps {
    children: React.ReactElement<HTMLInputElement>;

    errorText?: string;
}

const ValidityInput: React.FC<IValidityInformerProps> = ({ children, errorText = 'Invalid Text' }) => {
    console.log('ValidityInformer.render');

    const [validityError, setValidityError] = React.useState<string>();

    const handleOnChange = React.useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            console.log(`ValidityInformer.handleOnChange: ${ev.target.value}, pattern: ${children.props.pattern}`);
            if (children.props.pattern) {
                setValidityError(isValid(ev.target.value, children.props.pattern) ? undefined : errorText);
            }
            console.log();

            /**
             * calling the original callback assigned to the child
             */
            if (children.props.onchange) children.props.onchange(ev);
        },
        [children, errorText]
    );

    const clonedChild = React.useMemo(() => {
        const props: React.HTMLProps<HTMLInputElement> = {
            onChange: handleOnChange
        };
        const child = React.cloneElement(children, props); //props

        return child;
    }, [children, handleOnChange]);

    if (!clonedChild) return <></>;

    return (
        <div className="input-wrapper">
            {clonedChild}
            {validityError && <span className="error">{validityError}</span>}
        </div>
    );
};

export default React.memo(ValidityInput);

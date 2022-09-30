import * as React from 'react';

type ValueType = string | number | string[];
type ValidatorType = (value?: ValueType) => string | undefined;

interface RequiredInputProps {
    error?: string;
    value?: ValueType;
}

function InputValidation<InputProps extends RequiredInputProps>(InputComponent: React.ComponentType<InputProps>, validators: ValidatorType) {

    return class InputWithValidation extends React.Component<InputProps> {
        render() {
            const { error, value } = this.props;

            const firstInvalidValidator = validators.find((validate: (arg0: ValueType | undefined) => ValidatorType) => !!validate(value));

            const validationError = firstInvalidValidator && firstInvalidValidator(value);

            return <InputComponent {...this.props} error={error || validationError} />;
        }
    };

}

export default InputValidation;

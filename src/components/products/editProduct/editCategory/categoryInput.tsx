import Input from '../../../Input/input.component';
import InputValidation from '../../../validation/InputValidation';

const requiredValidator = (value?: string) => (!value ? 'Required' : undefined);

const minLengthValidator = (value?: string) => (value && value.length < 8 ? 'Too short' : undefined);

const difficultyValidator = (value?: string) => (value && !/^(?=.*\d)(?=.*[A-Za-z]).*$/.test(value) ? 'Must contain at least one number and letter' : undefined);

const CategoryInput = InputValidation(Input, [requiredValidator, minLengthValidator, difficultyValidator]);

export default CategoryInput;

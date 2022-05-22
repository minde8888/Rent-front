import React, { useState } from 'react'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'

interface ISignUpForm {
    fullName: string
    password: string
    confirmPassword: string
    email: string
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const SignUp: React.FunctionComponent = () => {
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewUser = async (data: ISignUpForm, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            if (data) {
                setFormStatus(formStatusProps.success)
                resetForm({})
            }
        } catch (error) {
            const response = error.response
            if (
                response.data === 'user already exist' &&
                response.status === 400
            ) {
                setFormStatus(formStatusProps.duplicate)
            } else {
                setFormStatus(formStatusProps.error)
            }
        } finally {
            setDisplayFormStatus(true)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                }}
                onSubmit={(values: ISignUpForm, actions) => {
                    createNewUser(values, actions.resetForm)
                    setTimeout(() => {
                        actions.setSubmitting(false)
                    }, 500)
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Enter valid email-id'),
                    fullName: Yup.string().required('Please enter full name'),
                    password: Yup.string()
                        .matches(
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
                        )
                        .required(
                            'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                        ),
                    confirmPassword: Yup.string()
                        .required('Required')
                        .test(
                            'password-match',
                            'Password musth match',
                            function (value) {
                                return this.parent.password === value
                            }
                        ),
                })}
            >
                {(props: FormikProps<ISignUpForm>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
                    return (
                        <Form>
                            <h1 >Sign up</h1>
                            <div>
                                <div>
                                    <input
                                        name="fullName"
                                        id="fullName"
                                        value={values.fullName}
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.fullName && touched.fullName
                                            ? <label>{errors.fullName}</label>
                                            : <label> 'Enter your full name.' </label>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.password && touched.password
                                            ? <label>Please valid password. One uppercase, one lowercase, one special character and no spaces</label>
                                            : <label> One uppercase, one lowercase, one special character and no spaces </label>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        value={values.confirmPassword}
                                        type="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.confirmPassword && touched.confirmPassword
                                            ? <label>{errors.confirmPassword}</label>
                                            : <label> Re-enter password to confirm </label>
                                    }
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        type="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.email && touched.email
                                            ? <label>{errors.email}</label>
                                            : <label>Enter email-id </label>
                                    }
                                </div>
                                <div >
                                    <button
                                        type="submit"
                                        color="secondary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                    {displayFormStatus && (
                                        <div className="formStatus">
                                            {formStatus.type === 'error' ? (
                                                <p>
                                                    {formStatus.message}
                                                </p>
                                            ) : formStatus.type ===
                                                'success' ? (
                                                <p>
                                                    {formStatus.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default SignUp
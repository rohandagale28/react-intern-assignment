import React, { useState, useCallback } from 'react';
import { Button, Input, InputLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    phoneNumber: string;
    email: string;
}

interface FormErrors {
    name?: string;
    phoneNumber?: string;
    email?: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phoneNumber: '',
        email: ''
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const router = useNavigate()

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const validateForm = () => {
        const errors: FormErrors = {};

        if (!formData.name) {
            errors.name = 'Name must not be empty';
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Email is not valid';
        }

        return errors;
    };

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        localStorage.setItem('formData', JSON.stringify(formData));
        setFormErrors({});
        router("/component-1")

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment, react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-10'>
                <div>
                    <InputLabel>Name</InputLabel>
                    <Input
                        className='w-80'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                    />
                    {formErrors.name && <FormHelperText error>{formErrors.name}</FormHelperText>}
                </div>
                <div>
                    <InputLabel>Phone Number</InputLabel>
                    <Input
                        className='w-80'
                        type='number'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={!!formErrors.phoneNumber}
                    />
                    {formErrors.phoneNumber && <FormHelperText error>{formErrors.phoneNumber}</FormHelperText>}
                </div>
                <div>
                    <InputLabel>Email</InputLabel>
                    <Input
                        className='w-80'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                    />
                    {formErrors.email && <FormHelperText error>{formErrors.email}</FormHelperText>}
                </div>
                <div>
                    <Button type='submit'>Save</Button>
                </div>
            </form>
        </div>
    );
}

export default Form;

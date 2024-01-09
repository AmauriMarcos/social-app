import { useState } from 'react';

const useValidation = () => {
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateName = (name) => {
        if (name.trim().length === 0) {
            setNameError("Name cannot be empty");
            return false;
        } else {
            setNameError('');
            return true;
        }
    };

    const validateUsername = (username) => {
        if (username.length <= 2) {
            setUsernameError("Username must contain at least 3 characters");
            return false;
        } else {
            setUsernameError('');
            return true;
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email");
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            setPasswordError("Password must contain at least 6 characters");
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    };

    return {
        nameError, usernameError, emailError, passwordError,
        validateName, validateUsername, validateEmail, validatePassword
    };
};

export default useValidation;

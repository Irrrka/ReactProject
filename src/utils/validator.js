const validateEmployee = (name, email, position) => {

    const errors = [];
    
    if (name.length < 1) {
        errors.push('Name cannnot be empty.');
    }

    if (email.length < 1) {
        errors.push('Email cannot be empty.');
    }

    if (position.length < 1) {
        errors.push('Position cannot be empty.');
    }

    return errors;
}

export default validateEmployee;
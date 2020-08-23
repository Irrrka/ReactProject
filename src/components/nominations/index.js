import React from 'react';
import Comment from '../comment';

const Nominations = ({employee}) => {

    if (employee.nominations.length < 1) {
        return (
            <h3>No nominations yet!</h3>
        )
    }

    return (
        employee.nominations.map(Nomination => {
            return (
                <Nomination key={Nomination._id} {...Nomination} />
            )
        })
    )
}

export default Nominations
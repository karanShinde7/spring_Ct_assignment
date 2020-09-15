import React from 'react';
const TabelRowComponent = props => {
    return(
        <tr>
            <th scope="row">{props.user.id}</th>
            <td>{props.user.name}</td>
            <td>{props.user.phoneNo}</td>
            <td>{props.user.address}</td>
        </tr>
    )
}

export default TabelRowComponent;
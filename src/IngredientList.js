import React, { Component } from 'react';

class IngredientList extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.recipie.ingredients.map((item, i) => {
                        return (<li key={i}>{item.quantity} - {item.ingredient}</li>);
                    })
                }
            </ul>
        );
    }
}

export default IngredientList;
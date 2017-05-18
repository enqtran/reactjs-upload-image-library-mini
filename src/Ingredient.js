import React, { Component } from 'react';

class Ingredient extends Component {
    constructor(props) {
        super(props);
        this.addIngredient = this.addIngredient.bind(this);
    }

    addIngredient() {
        if (this.quantity.value !== '' && this.ingredient.value !== '') {
            this.props.addIngredient(this.quantity.value, this.ingredient.value);
            this.quantity.value = "";
            this.ingredient.value = "";
        } else {
            alert('quantity & ingredient ');
        }
    }

    render() {
        return (
            <div className="form-group form-inline">
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        placeholder="Quantity"
                        ref={(input) => { this.quantity = input }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredient">ingredient</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ingredient"
                        placeholder="Ingredient"
                        ref={(input) => { this.ingredient = input }}
                    />
                </div>
                <button type="button" onClick={this.addIngredient} className="btn btn-success">Add</button>
            </div>
        );
    }
}

export default Ingredient;
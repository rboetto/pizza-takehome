import React, { useState } from 'react';
import './Pizza.css';

class Pizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pizzaText: this.props.name
    }
  }

  get getTops() {
    return this.toppings;
  }

  get getNumTops() {
    return this.toppings.size;
  }

  // Returns 'true' if topping was successfully added to set
  // 'add()' normally returns Set object itself
  addTopping(topping) {
    let i = this.toppings.size;
    this.toppings.add(topping);
    return this.toppings.size === i + 1;
  }

  // Returns 'true' if topping was successfully removed from set
  removeTopping(topping) {
    let i = this.toppings.size;
    this.toppings.delete(topping);
    return this.toppings.size === i - 1;
  }

  clearToppings() {
    this.toppings.clear();
  }

  equals(other) {
    return this.toppings.size === other.getNumTops() &&
      this.toppings.every((x) => other.getTops().has(x));
  }

  render() {
    return (
      <div>
        Pizza app coming soon
      </div>
    );
  }
}

class Title extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='Title'>
        <h1>{this.props.title}</h1>
      </div>
    )
  }
}

class PizzaButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='Center'>
        <button
          className='Button'
          onClick={() => this.props.onClick()}>
          ADD A PIZZA
        </button>
      </div>
    );
  }
}

class BuildPizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.toppings ?? {
      Mushrooms: false,
      Pepperony: false,
      Onions: false,
      Artichoke: false,
      Olives: false
    }
  }

  render() {
    return (
      <div>
        <div
          className='Center'>
          CHOOSE WHICH TOPPINGS YOU'D LIKE TO ADD TO YOUR PIZZA
        </div>
        <div className='Center'>
          <button
            className='Button'
            style={{ background: this.state.Mushrooms ? '#999' : '#fff' }}
            onClick={() => this.setState({ Mushrooms: !this.state.Mushrooms })}>
            MUSHROOMS
          </button>
          <button
            className='Button'
            style={{ background: this.state.Pepperony ? '#999' : '#fff' }}
            onClick={() => this.setState({ Pepperony: !this.state.Pepperony })}>
            PEPPERONY
          </button>
          <button
            className='Button'
            style={{ background: this.state.Onions ? '#999' : '#fff' }}
            onClick={() => this.setState({ Onions: !this.state.Onions })}>
            ONIONS
          </button>
          <button
            className='Button'
            style={{ background: this.state.Artichoke ? '#999' : '#fff' }}
            onClick={() => this.setState({ Artichoke: !this.state.Artichoke })}>
            ARTICHOKE
          </button>
          <button
            className='Button'
            style={{ background: this.state.Olives ? '#999' : '#fff' }}
            onClick={() => this.setState({ Olives: !this.state.Olives })}>
            OLIVES
          </button>
        </div>
        <div className='Center'>
          <button
            className='Button'
            onClick={() => this.props.onComplete(JSON.stringify(this.state))}>
            SUBMIT
          </button>
        </div>
      </div>)
  }
}

class PizzaApp extends React.Component {
  constructor(props) {
    super(props);
    this.title = "RICARDO'S PIZZA SHOP";
    this.state = {
      creatingPizza: false,
      duplicatePizza: false,
      pizzas: null
    }
  }

  addPizzaClick() {
    this.setState({ creatingPizza: true, duplicatePizza: false });
  }

  newPizzaAdded(newPizza) {
    this.state.toppings = null; // Edge case
    let pizzaSet = this.state.pizzas ?? new Set();
    let preSize = pizzaSet.size;
    pizzaSet.add(newPizza);
    let doop = preSize == pizzaSet.size; // If pizza was not added to set, set size won't change
    this.setState({
      creatingPizza: false,
      duplicatePizza: doop,
      pizzas: pizzaSet,
    });
  }

  deletePizza(pizza) {
    this.state.pizzas.delete(pizza);
    this.state.toppings = null;
    this.forceUpdate();
  }

  editPizza(pizza) {
    this.state.pizzas.delete(pizza);
    this.state.toppings = JSON.parse(pizza);
    this.state.creatingPizza = true;
    this.forceUpdate();
  }

  renderPromptSection() {
    if (this.state.creatingPizza) {
      return (
        <BuildPizza
        toppings={this.state.toppings}
        onComplete={(newPizza) => this.newPizza = this.newPizzaAdded(newPizza)} />
      )
    }
    else return (
      <PizzaButton onClick={() => this.addPizzaClick()} />
    )
  }

  renderDuplicationError() {
    if (!this.state.duplicatePizza) return null;

    return (<div className='Center'>
      YOU CANNOT ENTER A DUPLICATE PIZZA
    </div>)
  }

  parsePizza(pizza) {
    let pizzaObj = JSON.parse(pizza);
    let pizzaStr = "PIZZA WITH ";
    for (let key in pizzaObj) {
      if (pizzaObj[key]) pizzaStr += (key + ", ")
    }

    if (pizzaStr === "PIZZA WITH ") return "CHEESE PIZZA";

    pizzaStr = pizzaStr.replace(/, $/, "") // remove trailing comma and whitespace
    pizzaStr = pizzaStr.replace(/([a-zA-Z]+)(,)( [a-zA-Z]+$)/, "$1 AND$3") // Replace last comma with 'and'
    pizzaStr = pizzaStr.toUpperCase();

    return pizzaStr;
  }

  renderPizzas() {

    if (!this.state.pizzas || this.state.pizzas.size === 0) return null;


    let pizzaList = [];

    this.state.pizzas.forEach((pizza) => pizzaList.push(
      <div className='Center'>
        {this.parsePizza(pizza)}
        <button className='Button'
          onClick={() => this.editPizza(pizza)}>EDIT</button>
        <button
          className='Button'
          onClick={() => this.deletePizza(pizza)}>DELETE</button>
      </div>
    ))

    return pizzaList
  }


  render() {
    return (
      <div>
        <Title title={this.title} />
        {this.renderPromptSection()}
        {this.renderDuplicationError()}
        {this.renderPizzas()}
      </div>)
  }
}

class App extends React.Component {
  render() {
    return (
      <PizzaApp />
    );
  }
}


export default App
import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
    console.log(this.state);
  }

  render() {
    const clickAddButton = this.props.clickAddButton;
    return (
      <div>
        <input type="text" name="newListItem" placeholder="New To Do Item" value={this.state.value} onChange={this.handleChange} />
        <button type="submit" onClick={clickAddButton(this.state.value)}>Add New Item</button>
      </div>
    );
  }
}

const List = ({listItems}) => {
  return (
    <ul>
      {listItems.map((listItem, i) => {
        return (
          <ListItem listItem={listItem} index={i} />
        )
      })}
    </ul>
  )
}

const ListItem = ({listItem, index}) => {
  return (
    <li>
      {index + 1} - {listItem}
    </li>
  )
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      listItems: []
    };
    this.clickAddButton = this.clickAddButton.bind(this)
  }

  clickAddButton() {
    this.setState({listItems: this.state.listItems.concat('my new list item')})
  }

  render() {
    const listItems = this.state.listItems;
    return (
      <Fragment>
        <List listItems={this.state.listItems} />
        <NewItem clickAddButton={this.clickAddButton} />
      </Fragment>
    );
  }
}

export default App;

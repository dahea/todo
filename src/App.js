import React, { Component, Fragment } from 'react';
import './App.css';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" name="newListItem" placeholder="New To Do Item" value={this.state.value} onChange={this.handleChange} />
        <button type="submit" onClick={() => this.props.clickAddButton(this.state.value)}>Add New Item</button>
      </div>
    );
  }
}

const List = ({listItems}) => {
  return (
    <ul>
      {listItems.map((listItem, i) => {
        return (
          <ListItem listItem={listItem} key={i} index={i} />
        )
      })}
    </ul>
  )
}

const ListItem = ({listItem, index}) => {
  return (
    <li key={index}>
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

  clickAddButton(value) {
    if (value) {
        this.setState({listItems: this.state.listItems.concat(value)})
    } else {
      console.log('error')
    }
  }

  render() {
    const listItems = this.state.listItems;
    return (
      <div className='to-do-list'>
        <List listItems={listItems} />
        <NewItem clickAddButton={this.clickAddButton} />
      </div>
    );
  }
}

export default App;

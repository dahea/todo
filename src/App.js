import React, { Component } from 'react';
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

const List = ({listItems, clickComplete, clickDelete}) => {
  return (
    <ul>
      {listItems.map((listItem, i) => {
        return (
          <ListItem listItem={listItem} key={i} index={i} clickComplete={clickComplete} clickDelete={clickDelete} />
        )
      })}
    </ul>
  )
}

const ListItem = ({listItem, index, clickComplete, clickDelete}) => {
  return (
    <li key={index}>
      {index + 1} - {listItem}

      <div className='options-wrapper'>
          <div onClick={() => clickComplete(index)} className='option complete'>✓</div>
          <div onClick={() => clickDelete(index)} className='option delete'>X</div>
      </div>
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
    this.clickComplete = this.clickComplete.bind(this)
    this.clickDelete = this.clickDelete.bind(this)
  }

  clickAddButton(value) {
    if (value) {
        this.setState({listItems: this.state.listItems.concat(value)})
    } else {
      console.log('error')
    }
  }

  clickComplete(i) {
      console.log(`complete ${i}`) 
  }

  clickDelete(i) {
    let newListItems = this.state.listItems
    newListItems.splice(i, 1)
    this.setState({listItems: newListItems})
  }

  render() {
    const listItems = this.state.listItems;
    return (
      <div className='to-do-list'>
        <List listItems={listItems} clickComplete={this.clickComplete} clickDelete={this.clickDelete} />
        <NewItem clickAddButton={this.clickAddButton} />
      </div>
    );
  }
}

export default App;

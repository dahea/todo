import React, { Component } from 'react';
import { Check, X, Plus } from 'react-feather';
import './App.css';

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.localClickAddButton = this.localClickAddButton.bind(this);
    this.localKeyPress = this.localKeyPress.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
    if (this.state.value != '') {
      this.props.handleInputChange();
    }
  }

  localClickAddButton(){
    this.props.clickAddButton(this.state.value)
    this.setState({value: ''})
  }

  localKeyPress(event) {
    if (event.key == 'Enter'){
      this.localClickAddButton();
    }
  }


  render() {
    return (
      <div className={`add-item ${this.props.hasError && 'error'}`}>
        <input type="text" name="newListItem" placeholder="New To Do Item" value={this.state.value} onChange={this.handleChange} onKeyPress={this.localKeyPress}/>
        <button type="submit" onClick={this.localClickAddButton}><Plus /></button>
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
    <li className={listItem.complete && 'complete'} key={index}>
      {listItem.text}

      <div className='options-wrapper'>
          <div onClick={() => clickComplete(index)} className='option complete'><Check /></div>
          <div onClick={() => clickDelete(index)} className='option delete'><X /></div>
      </div>
    </li>
  )
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      listItems: [],
      hasError: false
    };
    this.clickAddButton = this.clickAddButton.bind(this)
    this.clickComplete = this.clickComplete.bind(this)
    this.clickDelete = this.clickDelete.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  clickAddButton(value) {
    if (value) {
        this.setState({listItems: this.state.listItems.concat({text: value, complete: false})})
    } else {
        this.setState({hasError: true})
    }
  }

  clickComplete(i) {
    let updatedItem = {text: this.state.listItems[i].text, complete: !this.state.listItems[i].complete}
    let newListItems = this.state.listItems
    newListItems.splice(i, 1, updatedItem)
    this.setState({listItems: newListItems})
  }

  clickDelete(i) {
    let newListItems = this.state.listItems
    newListItems.splice(i, 1)
    this.setState({listItems: newListItems})
  }

  handleInputChange() {
    this.setState({hasError: false})
  }

  render() {
    const listItems = this.state.listItems;
    return (
      <div className='to-do-list'>
        <List listItems={listItems} clickComplete={this.clickComplete} clickDelete={this.clickDelete} />
        <NewItem clickAddButton={this.clickAddButton} handleInputChange={this.handleInputChange} hasError={this.state.hasError}/>
      </div>
    );
  }
}

export default App;

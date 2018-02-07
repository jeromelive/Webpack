import React, { Component } from 'react';

const PropTypes = require('prop-types');

// class Button extends Component {
//   constructor(props, context) {
//     super(props);
//     console.log(`button-constructor-${context.color}`);
//   }

//   componentWillReceiveProps(nextProps, nextContext) {
//     console.log(`button-componentWillReceiveProps-${nextContext.color}`);
//   }
  
//   shouldComponentUpdate(nextProps, nextState, nextContext) {
//     console.log(`button-shouldComponentUpdate-${nextContext.color}`);
//     return true;
//   }

//   componentWillUpdate(nextProps, nextState, nextContext) {
//     console.log(`button-componentWillUpdate-${nextContext.color}`);
//   }

//   componentDidUpdate(props, state, context) {
//     console.log(`button-componentDidUpdate-${context}`);
//   }

//   render() {
//     return(
//       <button style={{background: this.context.color}}>
//         button
//       </button>
//     )
//   }
// }

function Button(props, context) {
  return(
    <button style={{background: context.color}}>
      button
    </button>
  )
}

Button.contextTypes = {
  color: PropTypes.string
}

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class Context extends Component {
  constructor(props) {
    super(props);
    this.messages = [
      'adasda',
    ]
    this.state = {
      color: '#00ff13'
    }
  }

  getChildContext() {
    return {
      color: this.state.color
    }
  }

  handleChanged(e) {
    e.preventDefault();
    this.setState({
      color: e.target.value
    })
  }

  render(){
    const children = this.messages.map((message, index) => {
      return (<Message key={index} text={message}></Message>)
    })
    return(
      <div>
        <div>
          <input type="text" defaultValue={this.state.color} onChange={this.handleChanged.bind(this)}/>
        </div>
        {children}
      </div>
    )
  }
}

Context.childContextTypes = {
  color: PropTypes.string
}

export default Context;
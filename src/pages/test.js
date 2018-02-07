import React, {Component} from 'react';
import styles from './test.css';
class Test extends React.Component {
// class Test extends Component {
  constructor(props) {
    super(props);
    // this.text = 'Test';
    this.state = {
      text: 'Test',
      obj: {
        name: 'jerome',
        age: 12
      }
    }
  }

  componentWillMount() {
    console.log('child-componentWillMount');
  }

  componentDidMount() {
    console.log('child-componentDidMount');
  }

  componentWillReceiveProps() {
    console.log('child-componentWillReceiveProps');
  }

  // shouldComponentUpdate() {
  //   console.log('child-shouldComponentUpdate');
  //   return true;
  // }

  componentWillUpdate() {
    console.log('child-componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('child-componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('child-componentWillUnmount');
  }

  handleClick(e) {
    e.preventDefault();
    // this.text = 'Change';
    // this.forceUpdate();
    console.log(this.context);
    this.setState({
      obj: {
        name: 'jerome',
        age: 12
      }
    })
  }

  render() {
    console.log('render');
    return(
      <div className={styles.app}>
        <div className={styles.app}>{this.state.text}</div>
        <div>{this.state.obj.name}</div>
        <div>{this.state.obj.age}</div>
        <button onClick={this.handleClick.bind(this)}>点我</button>
      </div>
    )
  }
}

export default Test;
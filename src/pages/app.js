import React, {Component} from 'react';
import styles from './app.css';
class App extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return(
      <div className={styles.app}>Test</div>
    )
  }
}

module.exports = App;
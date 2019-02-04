import React, { Component } from 'react';
import {Feed} from './components/Feed';
import './App.css';
import 'bulma/css/bulma.css';

class App extends Component {
  render() {
    return (
      <div className="tile is-parent">
        <article className="tile is-child notification is-primary">
          <p className="title">The Simple Blog</p>
          <Feed/>
        </article>
      </div>
    );
  }
}

export default App;

import React from 'react';
import {Component} from 'reflux';
import {BlogStore} from '../reflux-things/blogstore';
import {Actions} from '../reflux-things/actions';

export class PublicationPoster extends Component{

  constructor(props){
    super(props);
    this.store = BlogStore;
    this.state = {
      newAuthor: "Sergio Pereo",
      newPublicationMessage: ""
    }
  }

  newPublicationMessageHandler = (e)=>{
    this.setState({newPublicationMessage: e.target.value})
    console.log(this.state.newPublicationMessage)
  }

  newPublicationHandler = () =>{
    Actions.postPublication(
      this.state.newAuthor,
      Date.now(),
      this.state.newPublicationMessage,
      [],
      []
    )
  }

  render(){
    return(
      <article className="media">
        <div className="media-content">
          <div className="field">
            <div className="content is-large">
              <p>
                Post your simple ideas!
              </p>
            </div>
            <p className="control">
              <textarea onChange={this.newPublicationMessageHandler} className="textarea" placeholder="Post something..."></textarea>
            </p>
          </div>
          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                <button onClick={this.newPublicationHandler} className="button is-fullwidth is-info">Post!</button>
              </div>
            </div>
          </nav>
        </div>
      </article>
    )
  }
}

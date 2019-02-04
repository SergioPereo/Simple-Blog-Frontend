import React from 'react';
import {Component} from 'reflux';
import {PublicationPoster} from './PublicationPoster';
import {Publication} from './Publication';
import {BlogStore} from '../reflux-things/blogstore';
import {Actions} from '../reflux-things/actions';

export class Feed extends Component{

  constructor(props){
    super(props);
    this.store = BlogStore;
    this.state = {
        author: "Manuel Sevilla",
        inputPublication: ""
    }
  }

  componentDidMount(){
    Actions.getPublications()
  }



  render(){
    const publicationsDisplay =
    this.state.publications.length !== 0
    ?
    (
      <div>
      {
        this.state.publications.map(publication=>{
          return(
            <Publication
            id={publication._id}
            author={publication.author}
            date={publication.date}
            message={publication.message}
            comments={publication.comments}
            key={publication._id}
            />
          )
        })
      }
      </div>
    )
    :
    (
      <div>
      </div>
    )

    return(
      <div className="container is-fluid">
        <section className="section is-medium">
          <PublicationPoster/>
        </section>
        {publicationsDisplay}
      </div>
    )
  }
}

import React from 'react'
import {Component} from 'reflux'
import PropTypes from 'prop-types'
import {BlogStore} from '../reflux-things/blogstore'
import {Actions} from '../reflux-things/actions'

const randomNames=["Joe","Casco","Juan","Francisco"]

export class Publication extends Component{

  static propTypes = {
    author: PropTypes.string,
  }

  constructor(props){
    super(props);
    this.store = BlogStore;
    this.state = {
      newMessage: "",
      newComment: "",
      isEditMode: false,
      isLiked: false
    }
  }

  randomNameGenerator(){
    return randomNames[Math.round(Math.random()*(randomNames.length-1))]
  }

  changeEditState = (e)=>{
    const newIsEditMode = this.state.isEditMode ? false : true
    this.setState({isEditMode: newIsEditMode})
  }

  changeNewCommentText = (e)=>{
    this.setState({newComment: e.target.value})
  }

  changeNewMessageText = (e)=>{
    this.setState({newMessage: e.target.value})
  }

  deletePublication = () =>{
    Actions.deletePublication(this.props.id)
  }

  postComment = () =>{
    const namePostComment = this.randomNameGenerator()
    Actions.editPublicationComments(this.props.id,[{
      autor: namePostComment,
      commentMessage: this.state.newComment,
      commentDate: Date.now()
    }])
  }

  editPublicationM = () =>{
    Actions.editPublicationMessage(this.props.id,this.state.newMessage)
  }

  likeButton = () =>{
    const newIsLiked = this.state.isLiked ? false : true
    this.setState({isLiked: newIsLiked})
  }



  render(){

    const editModeDisplay =(
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea onChange={this.changeNewMessageText} className="textarea" placeholder="Edit..."></textarea>
            </p>
          </div>
          <div className="field">
            <div className="control">
              <div className="columns">
                <div className="column"><button onClick={this.editPublicationM} className="button is-success">Save Edit</button></div>
                <div className="column"><button onClick={this.changeEditState} className="button is-danger">Cancel</button></div>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
    const noEditModeDisplay = (
      <div></div>
    )

    const comments = this.props.comments;

    const commentsDisplay = comments.length !== 0 ?
    (
      <div>
      {
        comments.map(comment=>{
          return(
            <article key={comment._id} className="media">
              <figure className="media-left">
                <p className="image is-48x48">
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.autor}</strong>
                    <br/>
                    {comment.commentMessage}
                    <br/>
                    <small>{comment.commentDate}</small>
                  </p>
                </div>
              </div>
            </article>
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
      <section className="section is-medium">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.author}</strong>
                <br/>
                {this.props.message}
                <br/>
                <small><button disabled={this.state.isLiked} onClick={this.likeButton} className="button is-small is-info">{this.state.isLiked ? "You and "+Math.round(Math.random()*30+10)+" people like this!" : "Like"}</button> · {this.props.date}</small>
              </p>
            </div>
            {commentsDisplay}
          </div>
          </article>
          <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea onChange={this.changeNewCommentText} className="textarea" placeholder="Add a comment..."></textarea>
              </p>
            </div>
            <div className="field">
              <div className="control">
                <div className="columns">
                  <div className="column"><button onClick={this.postComment} className="button is-success">Post comment</button></div>
                  <div className="column"><button onClick={this.changeEditState} className="button is-info">Edit Publication</button></div>
                  <div className="column"><button onClick={this.deletePublication} className="button is-danger">Delete Publication</button></div>
                </div>
              </div>
            </div>
          </div>
        </article>
        {this.state.isEditMode ? editModeDisplay : noEditModeDisplay}
      </section>
    )
  }
}

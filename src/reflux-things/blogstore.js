import {Store} from 'reflux';
import {Actions} from './actions';
import axios from 'axios';

const URL_PUBLICATIONS = 'https://evening-reaches-94074.herokuapp.com/api/publications/';
const URL_THEMES = 'https://evening-reaches-94074.herokuapp.com/api/themes/';


export class BlogStore extends Store{

  constructor(){
    super();
    this.state = {publications:[],themes:[],publication:{},theme:{}};
    this.listenToMany(Actions);
  }

  onGetPublications = ()=>{
    axios.get(URL_PUBLICATIONS)
         .then(response=>{
           const publications = response.data
           this.setState({publications: publications})
         });
  }

  onGetOnePublication = (id)=>{
    axios.get(`${URL_PUBLICATIONS}/${id}`)
         .then(response=>{
           const publication = response.data
           this.setState({publication:publication})
           console.log(this.state.publication)
         });
  }

  onPostPublication=(author,date,message,comments,themes)=>{
    axios.post(URL_PUBLICATIONS,{
      author: author,
      date: date,
      message: message,
      comments: comments,
      themes: themes
    })
    .then(response=>{
      this.onGetPublications()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onEditPublicationMessage = (id,message) =>{
    axios.put(`${URL_PUBLICATIONS}${id}`,{
      message: message
    })
    .then(response=>{
      this.onGetPublications()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onEditPublicationComments = (id,comments)=>{
    let lastComments = [];
    let newComments = [];

    axios.get(`${URL_PUBLICATIONS}${id}`)
         .then(response=>{
           lastComments = response.data.comments;
           newComments = lastComments.concat(comments);
           axios.put(`${URL_PUBLICATIONS}${id}`,{
             comments: newComments
           })
           .then(response=>{
             console.log(response)
             this.onGetPublications()
           })
           .catch(err=>{
             console.log(err)
           })
         })
         .catch(err=>{
           console.log(err)
         })
  }

  onDeletePublication = (id) =>{
    axios.delete(`${URL_PUBLICATIONS}${id}`)
    .then(response=>{
      this.onGetPublications()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onGetThemes = () =>{
    axios.get(URL_THEMES)
         .then(response=>{
           const themes = response.data
           this.setState({themes: themes})
           console.log(this.state.themes)
         });
  }

  onGetOneTheme = (id)=>{
    axios.get(`${URL_THEMES}/${id}`)
         .then(response=>{
           const theme = response.data
           this.setState({theme:theme})
           console.log(this.state.theme)
         });
  }

  onPostTheme = (title,publicationsRelated) =>{
    axios.post(URL_THEMES,{
      title: title,
      publicationsRelated: publicationsRelated
    })
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onEditThemeTitle = (id,title) =>{
    axios.put(`${URL_THEMES}/${id}`,{
      title: title
    })
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onEditThemePublicationsRelated = (id,publicationsRelated) =>{
    let lastPublicationsRel = [];
    let newPublicationsRel = [];

    axios.get(`${URL_THEMES}/${id}`)
         .then(response=>{
           lastPublicationsRel = response.data.publicationsRelated;
           newPublicationsRel = lastPublicationsRel.concat(publicationsRelated);
           axios.put(`${URL_THEMES}/${id}`,{
             publicationsRelated: newPublicationsRel
           })
           .then(response=>{
             console.log(response)
           })
           .catch(err=>{
             console.log(err)
           })
         })
         .catch(err=>{
           console.log(err)
         })
  }

  onDeleteTheme = (id)=>{
    axios.delete(`${URL_THEMES}/${id}`)
    .then(response=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
  }

}

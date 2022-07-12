import './charList.scss';
import { Component } from 'react';
class CharListItem extends Component{
   
    
    imgStyle = {'objectFit' : 'cover'};
    
  

    render(){
        const {Item, onCharSelected, Mref, refOnclick} = this.props;
        const {id, name, thumbnail} = Item;
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            this.imgStyle = {'objectFit' : 'unset'};
        }
         return(
        <li className="char__item" 
            onClick={()=>{
                onCharSelected(id);  
                refOnclick(id)
            }}
            ref={Mref}
            >
                    <img src={thumbnail} alt={name} style={this.imgStyle}/>
                    <div className="char__name">{name}</div>
        </li>
    )
    }
  
}

export default CharListItem;
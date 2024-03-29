import { useState, useCallback, useRef } from "react";
import useMarvelService from "../services/MarvelService";
import setContent from "../utils/setContent";

export const useListMarvel = ()=>{
    const [items, setItems] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [itemsEnded, setItemsEnded] = useState(false)
 
    const {loading, error, getAllCharacters, clearError, process, setProcess} = useMarvelService();


    const onRequest = useCallback((offset, initial, type) => {
        initial ? setNewItemsLoading(false) :setNewItemsLoading(true); 
        getAllCharacters(offset,type)
            .then(onItemsLoaded)
            .then(()=> {setProcess('confirmed')})
            
    },[])

    const onItemsLoaded=useCallback((newItems)=>{
        let ended = false;
        if(newItems.length <9){
            ended = true;
        }
        setItems(items => [...items, ...newItems]);
        setNewItemsLoading( false);
        setOffset(offset => offset + 9);
        setItemsEnded(ended);
        // setProcess('confirmed')
    }, [])

  
    const itemRefs=useRef([]);
    const focusOnItem = useCallback((id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
    },[])

    return {items, newItemsLoading, itemRefs, offset, itemsEnded, onRequest, onItemsLoaded, focusOnItem, loading, error, process, setProcess}
}
import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {MainPage, ComicsPage, SingleComicPage} from '../pages';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(()=>import('../pages/404')) // динамический импорт

const App =()=> {    
    return (
    <Router>
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}> {/* работает вместе с lazy  */}
                    <Routes>{/* что бы все маршруты не были на одной странице  */}
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>  
                </Suspense>  
            </main>
        </div>
    </Router>
    )
    
    
}

export default App;
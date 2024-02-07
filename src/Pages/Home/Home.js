import React from 'react';
import s from './Home.module.css'
import Header from '../../Components/Header';
import Main 


const Home = () => {
    return (
        <section>
            <div className='container'>
                <div className={s.home_search}>
                    <form>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <button type='submit'>
                            <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home

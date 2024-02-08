import React, {useEffect} from 'react';
import Home from '../Home';
import {Route, Routes} from 'react-router-dom';
import { getLatestMeal } from '../../Redux-toolkit/MealSlice/MealSlice';
import { UseDispatch, useDispatch } from 'react-redux';




const Main = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLatestMeal())
  })
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default Main

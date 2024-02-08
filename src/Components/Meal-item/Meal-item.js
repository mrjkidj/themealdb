import React from 'react';
import s from './Meal-item.module.css';


const MealItem = (props) => {
const {strMeal, strMealThumb, onClick} = props
  return (
    <div onClick={onClick} className={s.meal_content}>
      <div className={s.meal_img}>
        <img src={strMealThumb} alt="" />
      </div>
      <p>{strMeal}</p>
    </div>
  )
}

export default MealItem

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../Http/Settings';

const initialState = {
    latest: [],
    infoMeal: [],
    popular: [],
    popularInfo: [],
    text: '',
    randomMeal: [],
    randomIngredient: [],
    country: [],
    countryInfo: [],
    alfavitMeal: [],
    search: [],

}
//?Latest Meal по цикл последнее блюдо
export const getLatestMeal = createAsyncThunk(
    "latest/getLatestMeal",
    async (_, { rejectWithValue, dispatch }) => {
        try {

            const mealNumbers = [
                53083, 53082, 53081, 53080, 53079, 53078, 53077, 53076,
            ]
            const results = await Promise.all(
                mealNumbers.map(async (number) => {
                    const result = await instance.get(`/lookup.php?i=${number}`)
                    return result.data.meals
                })
            )
            const combinedMeals = results.flat()
            dispatch(latestMeal(combinedMeals))
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

//?info id
export const getInfoMeal = createAsyncThunk(
    'infoMeal/getInfoMeal',
    async (elem, { rejectWithValue, dispatch }) => {
        //?получаем id и передаем по запросы приходят блюда с инфой 
        const result = await instance.get(`lookup.php?i=${elem}`);
        dispatch(infoIngredientMeal(result.data.meals))
    }
);

//?Отправляем запрос на популярные блюда 
export const getPopular = createAsyncThunk(
    "popular/getPopular",
    async (_, { rejectWithValue, dispatch }) => {
        const result = await instance.get('list.php?i=list');
        dispatch(popularMeal(result.data.meals));
        dispatch(getRandomIngredients(result.data.meals));
    }
)

//?filter.php?i=
//? Отправляем запросы по id на популярные блюда 
export const getPopularInfo = createAsyncThunk(
    'popularInfo/getPopularInfo',
    async (elem, { rejectWithValue, dispatch }) => {
        const response = await instance.get(`filter.php?i=${elem}`);
        dispatch(popularInfoMeal(response.data.meals))
    }
);

//?Запрос на рандомные блюда отправляем запрос 8 раз на одну api
export const getRandomMeal = createAsyncThunk(
    'randomMeal/getRandom',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const random = [1, 2, 3, 4, 5, 6, 7, 8];
            const responses = await Promise.all(
                random.map(() => instance.get('random.php'))
            );
            const randomMealsData = responses.map(
                (response) => response.data.meals[0]
            );
            dispatch(getRandom(randomMealsData));
        } catch (error) {
            console.log('Error fetching random Meals:', error);
        }
    }
);

//? Отправляем запросы по флаг выводим по народным блюдам
export const getCountryMeals = createAsyncThunk(
    'country/getCountryMeals',
    async (_, { rejectWithValue, dispatch }) => {
        const response = await instance.get('list.php?a=list');
        dispatch(getCountry(response.data.meals));
    }
);

//?Отправляем запросы информации по каждому блюда по id 
export const getCountryInfoMeals = createAsyncThunk(
    'countryInfo/getCountryInfoMeal',
    async (elem, { rejectWithValue, dispatch }) => {
        const response = await instance.get(`filter.php?a=${elem}`);
        dispatch(getCountryInfo(response.data.meals))
    }
);
//?Отправляем запрос по Алфавиту
export const getAlfavitMeals = createAsyncThunk(
    'alfavitMeal/getAlfavitMeals',
    async (elem, { rejectWithValue, dispatch }) => {
        const res = await instance.get(`search.php?f=${elem}`);
        dispatch(getAlfavitMeal(res.data.meals))
    }
);
//?Отправляем запрос для поиска
export const getSearchMeals = createAsyncThunk(
    'search/getSearchMeals',
    async (elem, { rejectWithValue, dispatch }) => {
        const res = await instance.get(`search.php?s=${elem}`)
        dispatch(getSearchMeal(res.data.meals))
    }
);
const mealSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        latestMeal: (state, action) => {
            state.latest = action.payload;
        },
        infoIngredientMeal: (state, action) => {
            state.infoMeal = action.payload;
        },
        popularMeal: (state, action) => {
            state.popular = action.payload;
        },
        popularInfoMeal: (state, action) => {
            state.popularInfo = action.payload;
        },
        onDescription: (state, action) => {
            state.text = action.payload;
        },
        getRandom: (state, action) => {
            state.randomMeal = action.payload;
        },
        getRandomIngredients: (state, action) => {
            state.randomIngredient = action.payload;
        },
        getCountry: (state, action) => {
            state.country = action.payload;
        },
        getCountryInfo: (state, action) => {
            state.countryInfo = action.payload;
        },
        getAlfavitMeal: (state, action) => {
            state.alfavitMeal = action.payload;
        },
        getSearchMeal: (state, action) => {
            state.search = action.payload;
        },
    }
});
//?
export const {
    latestMeal,
    infoIngredientMeal,
    popularMeal,
    popularInfoMeal,
    onDescription,
    getRandom,
    getRandomIngredients,
    getCountry,
    getCountryInfo,
    getAlfavitMeal,
    getSearchMeal
} = mealSlice.actions

export default mealSlice.reducer;

import { useCallback, useEffect } from 'react';
import Main from './components/main.component';
import { useAppDispatch } from './hooks/redux.hook';
import { getProducts } from './redux/slice/productsSlice';
import { getAllProducts } from './services/products.services/products.services';
import style from './App.module.scss';
import { getAllCategories } from './services/category.services/category.services';
import { getCategories } from './redux/slice/categoriesSlice';

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    /* eslint-disable */
    const fetchData = useCallback(async () => {
        const data = await getAllProducts();
        const categories = await getAllCategories();
        dispatch(getProducts(data));
        dispatch(getCategories(categories));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    /* eslint-disable */

    return (
        <div className={style.App}>
            <Main />
        </div>
    );
}

export default App;

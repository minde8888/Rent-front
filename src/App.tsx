import { useCallback, useEffect } from 'react';
import Main from './components/main.component';
import { useAppDispatch } from './hooks/redux.hooks';
import { getProducts } from './redux/slice/productsSlice';
import { getAllProducts } from './services/products.services/products.services';

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    /* eslint-disable */
    const fetchData = useCallback(async () => {
        const data = await getAllProducts();
        dispatch(getProducts(data));
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])
    /* eslint-disable */

    return (
        <div className="App">
            <Main />
        </div>
    );
}

export default App;

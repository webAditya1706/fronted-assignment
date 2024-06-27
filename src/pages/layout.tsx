import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/constant/Header';


const Layout: React.FC<any> = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Header/>
                <body>{children}</body>
            </PersistGate>
        </Provider>
    );
};

export default Layout;




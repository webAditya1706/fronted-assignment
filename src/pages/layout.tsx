import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';



const Layout: React.FC<any> = ({ children }: any) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <body>{children}</body>
            </PersistGate>
        </Provider>
    );
};

export default Layout;




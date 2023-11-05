import  {persistReducer}  from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './storeSlices/userSlice'

const persistConfig = {
    key:'root',
    storage,
};


const Persisted = persistReducer(persistConfig,userReducer);

const Store = configureStore({
    reducer:{
        user:Persisted
    }
})

const persistor = persistStore(Store)
export {Store,persistor}
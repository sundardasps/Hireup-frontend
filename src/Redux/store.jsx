import  {persistReducer}  from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './storeSlices/userSlice'
import  companyReducer from './storeSlices/companyslice'

const persistConfig = {
    key:'root',
    storage,
};


const userPersisted = persistReducer(persistConfig,userReducer);
const companyPersisted = persistReducer(persistConfig,companyReducer);


const Store = configureStore({
    reducer:{
        user:userPersisted,
        company:companyPersisted,
    }
})

const persistor = persistStore(Store)
export {Store,persistor}
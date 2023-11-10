import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Store, persistor } from "./Redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from '@chakra-ui/react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
const quaryClint =new QueryClient()
const clintid = import.meta.env.VITE_CLINT_ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={clintid}>
          <QueryClientProvider client={quaryClint}>
          <ChakraProvider>
          <App />
          </ChakraProvider>
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

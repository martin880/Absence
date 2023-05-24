import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({ reducer: rootReducer });
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<ChakraProvider>
				<ColorModeScript initialColorMode="light" />
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</Provider>
);

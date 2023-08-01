import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Login from "../components/Login";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "@/reducers/user";

const store = configureStore({
  reducer: { user },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

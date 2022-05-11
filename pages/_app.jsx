import "../styles/globals.css";
import { wrapper, store } from "../store";
import { Provider } from "react-redux";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);

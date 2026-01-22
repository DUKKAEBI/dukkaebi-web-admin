import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/router.tsx";
import { GlobalStyle } from "./page/styles/GlobalStyle.ts";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;

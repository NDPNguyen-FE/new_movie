import { Spin } from "antd";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { userRouter } from "./Constant/Route";
import PublicRoute from "./Routes/PublicRoute.js";
import ScrollToTop from "./User/components/ScrollToTop/ScrollToTop";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  window.onunload = function () {
    sessionStorage.removeItem("chairSTD");
    sessionStorage.removeItem("chairVIP");
  };

  return (
    <Suspense fallback={<Spin />}>
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          {userRouter.map((user, index) => {
            const Component = user.component;
            return (
              <Route
                key={index}
                exact
                path={user.path}
                render={(propsRoute) => (
                  <PublicRoute
                    isAuth={isAuthenticated === "KhachHang" ? true : false}
                  >
                    <Component {...propsRoute} />
                  </PublicRoute>
                )}
              ></Route>
            );
          })}
          {/* 
          {adminRouter.map((admin, index) => {
            const Component = admin.component;
            return (
              <Route
                exact
                key={index}
                path={admin.path}
                render={() => (
                  <PrivateRoute isAuth={auth.isAuthenticated}>
                    <Component />
                  </PrivateRoute>
                )}></Route>
            );
          })} */}
          {false ? <Redirect to="/admin" /> : <Redirect to="/" />}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./pages";
import Login, { loginAction } from "./pages/Login";
import Main, { loader } from "./pages/Main";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 이전 방식의 라우터 선언 방식. 이렇게 선언하면 v6의 신기능들을 못쓴다 ㅜㅜ
const originRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={<Main />}
          loader={loader}
          action={loginAction}
        />
      </Routes>
    </BrowserRouter>
  );
};

// 새 라우터 선언 방식. 이 라우터를 RouterProvider라는 친구에게 끼워넣어준다.
// 아마 RouterProvider가 어마어마한 것을 하고 있을 것이다. 로더 데이터를 내려준다던지... 하는 그런 것들.
export const newRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/main" element={<Main />} loader={loader} />
    </Route>
  )
);

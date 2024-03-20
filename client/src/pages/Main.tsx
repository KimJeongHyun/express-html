import { useEffect } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components,
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log("loader trigger!");
  return localStorage.getItem("sample");
};

/**
 * useRevalidator는 해당 페이지에 loader가 달려있는 경우, 해당 loader를 초기화한다.
 * @link https://reactrouter.com/en/main/hooks/use-revalidator
 */
const Main = () => {
  const data = useLoaderData() as string;
  const { revalidate, state } = useRevalidator();

  useEffect(() => {
    // revalidator의 state는 idle, loading이다.
    // revalidate가 끝나기 전엔 loading, 끝나면 idle.
    // 그래서 이 state를 isLoading과 같은 변수로서 활용할 수 있다.
    console.log(state);
  }, [state]);

  return (
    <>
      <br />
      입력한 정보는...
      <br />
      {JSON.stringify(JSON.parse(data))}
      <br />
      <br />
      <br />
      <button onClick={revalidate}>revalidate!</button>
    </>
  );
};

export default Main;

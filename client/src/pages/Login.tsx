import { FormEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

const condition = true;

// eslint-disable-next-line react-refresh/only-export-components
export const loginAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const parsedFormObject = Object.fromEntries(formData);

  localStorage.setItem("sample", JSON.stringify(parsedFormObject));

  if (condition) {
    return "모시깽이";
  } else {
    return redirect("/main");
  }
};

// form action --> action function -> do something by action return
// action function 에서는 return redirect를 통해 의도하는 타이밍에 다른 페이지로 보낼 수도 있고, 경우에 따라 값을 리턴하기도 한다.
// 예를 들어 API의 응답값을 리턴하게 만들고, useActionData로 받게 만든다던지,
// 혹은 API의 try~catch를 이용해 200이면 redirect를, 4xx면 에러 메세지를 리턴시켜서 컴포넌트가 useActionData로 에러 메세지를 받아 후속 처리를 할 수 있게끔 만들 수도 있다.
// redirect의 경우는 단순 URL 뿐만 아니라, 쿼리스트링을 붙여서 보내는 것도 당연히 가능하다.
// redirect의 의미는 아래를 의미한다.
/**
 * @link https://reactrouter.com/en/main/fetch/redirect
 */
// 302 = 요청된 리소스가 새로운 location으로 이동했음을 의미하는 코드. 즉, redirect다.
/**
 * @example new Response("", {
                status: 302,
                headers: {
                Location: someUrl,
                },
            });
 */

const Login = () => {
  // 이런식으로 action에서 반환하는 값을 긁어올 수 있다.
  // 초기 값은 undefined이다. 즉, useEffect(()=>{ if (data) errorToast(data) },[data]) 이런식으로 쓸 수 있다.
  const data = useActionData();

  // useSubmit은 Form의 onSubmit을 원하는 시점에 쏠 수 있는 훅이다.
  // react-hook-form과의 연동 용례가 존재한다.
  // link : https://github.com/orgs/react-hook-form/discussions/9910
  // react-hook-form을 form validation 용도로 사용하고, 실제 submit은 useSubmit이 수행하는 방식이다.
  const submit = useSubmit();

  // useNavigation은 라우팅에 대한 모든 걸 관장하는 react-router의 훅으로 설명되어있다.
  // https://reactrouter.com/en/main/hooks/use-navigation
  // state, formData, formAction, formAction 등등, 현재 페이지에서 전송한 데이터, 정의된 action의 method, action 함수의 상태 등을 확인할 수 있다.
  // state의 경우 idle -> submitting -> loading -> idle의 흐름으로 이어진다.
  // action 함수에 도달하기까지 submitting, action 함수가 돌고 있을 때가 loading, 끝나면 idle로 돌아오는 사이클로 생각하면 된다.
  // 즉, state !== idle인 케이스에 대해 button disabled를 시켜준다던지 하면 되는 것이다.
  // 위의 링크에 현재 action이 어떤 상태인지에 대해 (일반 렌더)인지, (action이 호출된 상태) 인지, (action이 끝나고 redirect되는 상태) 인지 등을 알 수 있는 변수 조합이 있다.
  const { state } = useNavigation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Form 태그에 onSubmit을 사용하는 경우, 기본동작으로 인해 후속 동작이 블로킹된다.
    // 그러므로 기본 동작을 막아준다.
    // 물론, Form 태그를 사용하지 않는 경우는 이 처리를 할 필요가 없다.
    e.preventDefault();

    // <Form action="/login" method="post"> 와 이 동작은 같다.
    // 만약 action을 지정하지 않는 경우 가장 인접한 action을 수행시킨다.
    // loginAction을 수행시키며, 해당 action함수의 request의 formData에 e.currentTarget을 담아 보내준다.
    // method는 post로 지정해주어야 action 함수가 수행된다.
    submit(e.currentTarget, {
      action: "/login",
      method: "post",
    });

    // get으로 지정하면 form tag의 고유 동작을 따라간다.
    // get인 경우, form tag의 고유 동작은 url에 쿼리스트링을 붙여서 라우팅하는 것이다.
    // main?email=뭐시기&password=뭐시기 로 URL이 변경된다.
    submit(e.currentTarget, {
      action: "/main",
      method: "get",
    });
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <input name="email" />
        </div>
        <div>
          <input name="password" />
        </div>
        <input type="submit" />
      </Form>
    </>
  );
};

export default Login;

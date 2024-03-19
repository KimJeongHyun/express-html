const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("port", process.env.PORT || 5000); // 포트 설정
app.set("host", process.env.HOST || "0.0.0.0"); // 아이피 설정
app.set("views", __dirname + "\\pages");
app.set("view engine", "ejs");

// index에서 form action method = "post" 로 test url로 요청을 보낸다.
app.get("/", function (req, res) {
  res.render("index.ejs");
});

const testLoader = ({ email, name }) => {
  return {
    email: "이메일!!!" + email,
    name: "이름!!!" + name,
  };
};

// test 라우트는 요청값을 받아 서빙될 파일에 body를 그대로 넘겨준다.
app.post("/test", function (req, res) {
  // 예를 들어 react-router의 loader는 아래 같은 동작을 한다고 이해하면 편하다.
  const loadedData = testLoader(req.body);

  // 그리고 서빙될 문서에 미리 말아둔 데이터를 전달한다.
  res.render("test.ejs", { data: loadedData });
});

// 흐름을 직렬화하면 index 렌더 -> index에서 form action 수행 -> test 렌더되기 전 loader 수행 -> test 렌더 이다.
// ejs 파일에서 렌더링을 담당하고, 서버사이드에서 라우팅을 담당하도록 한다.
// 그러나 SPA의 경우는 정적이므로 두가지 모두를 담당해야된다.
// 위와 같은 흐름의 코드는 로그인/회원가입과 같은 동작으로, 사실은 react 같은 라이브러리를 굳이 쓰지 않아도 손쉽게 구현할 수 있다.

// 즉 생각하기에, react-router v6에서 loader, action등을 도입한 것은 react가 필요이상으로 UI 외의 것을 신경쓰지 않도록 고안된 것이 아닐까? 생각이 든다.

app.listen(app.get("port"), app.get("host"), () =>
  console.log(
    "Server is running on : " + app.get("host") + ":" + app.get("port")
  )
);

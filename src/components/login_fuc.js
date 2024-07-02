import { persistor } from "..";
import userInfoSlice from "../state/UserInfo";
import store from "../state/store";


// 로그인과 회원가입 함수를 여기로 분리하였지만 뭔가 엉성하다
// onclick에 넣을 함수를 이곳에 분리해둔 것이라 볼 수 있다
// 그런데 뭔가 엉성하다 특히 회원가입에 화면의 onclick에는 여전히 어려운 함수가 들어간다
// export const server = "http://127.0.0.1:8000/";
//export const server = "http://0.0.0.0:8000/";
export const server = "http://192.168.0.3:8000/";

export const logOut = function () {
    persistor.purge();
}

export const logIn = function (userEmail, password) {
    //const dispatch = useDispatch();
    // 로그인 버튼을 클릭하면 백엔드 서버에 요청을 보낸다
    // 이때 body에 필요한 정보가 할당된다
    fetch(server + "login", {
        method: 'POST',
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
            email: userEmail,
            password: password,
        })
    })
        .then((res) => res.json())
        .then((data) => {
            store.dispatch(userInfoSlice.actions.getUserInfo(data));
        });
}

export const register = async function (userEmail, password, userName) {
    //const dispatch = useDispatch();
    // 로그인 버튼을 클릭하면 백엔드 서버에 요청을 보낸다
    // 이때 body에 필요한 정보가 할당된다
    // 데이터를 다른곳에 리턴하고 싶다면 fetch앞에 return 필요

    let userData = {};

    await fetch(server + "register", {
        method: 'POST',
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
            email: userEmail,
            password: password,
            name: userName,
        })
    })
        .then((res) => res.json())
        .then((data) => {
            //store.dispatch(userInfoSlice.actions.getUserInfo(data));
            //console.log(data)
            //logIn(userEmail, password);
            userData = data;
        });

    return userData
}
import { persistor } from "../../";
import { loginRoute } from "../../components/backend";
import userInfoSlice from "../../state/UserInfo";
import store from "../../state/store";


export const logOut = function () {
    persistor.purge();
}

export const logIn = function (userEmail, password) {
    //const dispatch = useDispatch();
    // 로그인 버튼을 클릭하면 백엔드 서버에 요청을 보낸다
    // 이때 body에 필요한 정보가 할당된다
    fetch(loginRoute, {
        method: 'POST',
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
            email: userEmail,
            password: password,
        })
    })
        .then((res) => { console.log(res); return res.json();})
        .then((data) => {
            console.log(String(data));
            store.dispatch(userInfoSlice.actions.getUserInfo(data));
        });
}

export const register = async function (userEmail, password, userName) {
    //const dispatch = useDispatch();
    // 로그인 버튼을 클릭하면 백엔드 서버에 요청을 보낸다
    // 이때 body에 필요한 정보가 할당된다
    // 데이터를 다른곳에 리턴하고 싶다면 fetch앞에 return 필요

    let userData = {};

    await fetch(loginRoute, {
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
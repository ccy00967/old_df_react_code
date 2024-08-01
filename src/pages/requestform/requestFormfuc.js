import { data } from "jquery";
import { requestsRoute } from "../../components/backend";
import store from "../../state/store";



export const postCustomerRequest = async function (request) {


    //const request = store.getState().request;
    const userInfo = store.getState().persist.userInfo;
    const address = store.getState().address;

    console.log(request)
    // console.log(userInfo)

    await fetch(requestsRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + userInfo.access,
        },
        body: JSON.stringify({
            ...request,
            address: address
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            //store.dispatch(requestSlice.actions.setRequest(data));
        })

    //console.log(customerRequests);
    //return customerRequests;

}

// {
//     request: request,
//         address: address
// }

// {
//     ...request,
//         address: address
// }

// {
//     request: {
//         size: string;
//         cropsinfo: string;
//         reservationDate: string;
//         requestContent: string;
//     }
//     address: {
//         roadaddress: string;
//         jibunAddress: string;
//         englishAddress: string;
//         navermapsx: string;
//         navermapsy: string;
//     }
// }

// {

//     size: string;
//     cropsinfo: string;
//     reservationDate: string;
//     requestContent: string;

//     address: {
//         roadaddress: string;
//         jibunAddress: string;
//         englishAddress: string;
//         navermapsx: string;
//         navermapsy: string;
//     }
// }
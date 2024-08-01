import store from "../../state/store";




export const getDetailed = async function (setdetail, setdetailaddress, setdetailowner) {
    //const url = "requestsRoute + 2c00ba43-8e7b-498c-aab3-5ac3ee94aa97/";

    //  try {
    //const response = await fetch(url, {
    let length = 0;
    let customerRequests = []
    //const response = 
    await fetch("https://192.168.0.28:1337/customer/requests/dc8a44b8-07b3-498a-a06a-1a200aa78097/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + store.getState().persist.userInfo.access,
        },
    })

        // if (!response.ok) {
        //     throw new Error("Error");
        // }
        .then((res) => res.json())
        .then((data) => {
            //const data = await response.json();
            length = data.length
            customerRequests = { ...data }
            setdetail(customerRequests)
            setdetailaddress(customerRequests.address)
            setdetailowner(customerRequests.requestowner)
            //aa(data)
        });
    //console.log(11,customerRequests.orderid)

    // } catch (error) {
    //     console.error(error.message);
    // }
}

// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
export async function requestPayment(payment, selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid) {
    const paymentInfo = {
        amount: {
            currency: "KRW",
            value: totalAmount,
        }, //최종 결제 값으로 바꾸기
        orderId: payorderid,
        orderName: "방제 서비스",
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: email,
        customerName: name,
        customerMobilePhone: phonenum,
    }
    console.log(payment, selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid)

    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    switch (selectedPaymentMethod) {
        case "CARD":
            await payment.requestPayment({
                method: "CARD", // 카드 및 간편결제
                ...paymentInfo,
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        // case "TRANSFER":
        //     await payment.requestPayment({
        //         method: "TRANSFER", // 계좌이체 결제
        //         amount,
        //         orderId: generateRandomString(),
        //         orderName: "토스 티셔츠 외 2건",
        //         successUrl: window.location.origin + "/payment/success",
        //         failUrl: window.location.origin + "/fail",
        //         customerEmail: "customer123@gmail.com",
        //         customerName: "김토스",
        //         customerMobilePhone: "01012341234",
        //         transfer: {
        //             cashReceipt: {
        //                 type: "소득공제",
        //             },
        //             useEscrow: false,
        //         },
        //     });
        // case "VIRTUAL_ACCOUNT":
        //     await payment.requestPayment({
        //         method: "VIRTUAL_ACCOUNT", // 가상계좌 결제
        //         amount,
        //         orderId: generateRandomString(),
        //         orderName: "토스 티셔츠 외 2건",
        //         successUrl: window.location.origin + "/payment/success",
        //         failUrl: window.location.origin + "/fail",
        //         customerEmail: "customer123@gmail.com",
        //         customerName: "김토스",
        //         customerMobilePhone: "01012341234",
        //         virtualAccount: {
        //             cashReceipt: {
        //                 type: "소득공제",
        //             },
        //             useEscrow: false,
        //             validHours: 24,
        //         },
        //     });
    }
}
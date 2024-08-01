import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { requestPayment } from "./tosspayments_func";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_LlDJaYngro2ZZaqGR00xVezGdRpX";
const customerKey = generateRandomString(); // 유저 uuid 넣기

const amount = {
    currency: "KRW",
    value: 1000,
};

export function PaymentCheckoutPage() {
    const [payment, setPayment] = useState(null);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    function selectPaymentMethod(method) {
        setSelectedPaymentMethod(method);
    }

    useEffect(() => {
        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey);

                // 회원 결제
                // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
                const payment = tossPayments.payment({
                    customerKey,
                });
                // 비회원 결제
                // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchPayment();
    }, [clientKey, customerKey]);

    return (
        <div className="wrapper">
            <div className="box_section">
                <h1>일반 결제</h1>
                <div id="payment-method" style={{ display: "flex" }}>
                    <button id="CARD" className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`} onClick={() => selectPaymentMethod("CARD")}>
                        카드
                    </button>
                    <button id="TRANSFER" className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`} onClick={() => selectPaymentMethod("TRANSFER")}>
                        계좌이체
                    </button>
                    <button id="VIRTUAL_ACCOUNT" className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`} onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}>
                        가상계좌
                    </button>
                </div>
                <button className="button" onClick={() => requestPayment(payment)}>
                    결제하기
                </button>
            </div>
        </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}
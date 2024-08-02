import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { requestPayment } from "./tosspayments_func";
import store from "../../state/store";
import { Container } from "react-naver-maps";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_LlDJaYngro2ZZaqGR00xVezGdRpX";

export function TossPaymentsPage() {

    const customerKey = store.getState().persist.userInfo.authenticatedUser.uuid;

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
        <div>
            <Container component="main" maxWidth="md">
                <Box height="150px"></Box>
                <Typography variant="h4">
                    일반 결제
                </Typography>
                <Box height="100px"></Box>
                <Stack spacing={4}>
                    <Grid>
                        <Button variant="contained" id="CARD" onClick={() => selectPaymentMethod("CARD")}>
                            카드
                        </Button>
                        <Button variant="contained" id="TRANSFER" onClick={() => selectPaymentMethod("TRANSFER")}>
                            계좌이체
                        </Button>
                        <Button variant="contained" id="VIRTUAL_ACCOUNT" onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}>
                            가상계좌
                        </Button>
                    </Grid>
                    <Typography variant="h4">
                        {selectedPaymentMethod}
                    </Typography>
                    <Button onClick={() => requestPayment(payment, selectedPaymentMethod)}>
                        결제하기
                    </Button>
                </Stack>
            </Container>
        </div>
    );
}

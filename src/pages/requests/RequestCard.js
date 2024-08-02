import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import store from '../../state/store';
import { requestSlice} from '../../state/request';
// 방제 신청 정보 카드 목록
export function RequestCard(props) {    

    const navigate = useNavigate()
    const request = props.request

    return (
        <Card sx={{
            height: '400px',
            minHeight: '250px',
            border: '1px solid black',
            borderRadius: '30px',
        }}>
            <CardContent>
                <Typography mt={2}
                    sx={{         //줄바꿈 밀림 방지
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}>
                    {request.address.jibunAddress}
                </Typography>
                <Typography mt={3}>{request.cropsinfo}</Typography>
                <Typography mt={3}>{request.size}</Typography>
                <Typography mt={3} >{request.reservationDate}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '100px' }}
                    onClick={() => {
                        console.log(request.orderid)
                        store.dispatch(requestSlice.actions.setRequestData(request))
                        navigate("/detail")
                    }}
                >
                    자세히 보기
                </Button>
            </CardContent>
        </Card>
    );
}


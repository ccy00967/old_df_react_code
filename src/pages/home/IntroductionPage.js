import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(8),
    textAlign: 'center',
}));

const Hero = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/path/to/your/image.jpg)', // 배경 이미지 경로
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
}));

const Content = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

export function IntroductionPage() {
    return (
        <Root>
            <Hero>
                <Typography variant="h2" component="h1">
                    드론평야
                </Typography>
            </Hero>
            <Content>
                <Typography variant="h5" component="h2" gutterBottom>
                    농민들을 위한 드론 방제 플랫폼
                </Typography>
                <Typography variant="body1" paragraph>
                <p>드론평야는 드론 방제 전문가와 농민들을 손쉽게 연결하는 혁신적인 플랫폼 회사입니다.</p>
                우리는 첨단 기술과 농업의 결합을 통해 농업 생산성을 높이고, 
                더 나은 환경을 조성하며, 농민들의 삶을 개선하는 것을 목표로 합니다.
                </Typography>
            </Content>
        </Root>
    );
}
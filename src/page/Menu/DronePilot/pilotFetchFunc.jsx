import { server } from "../../url";



export const fetchToken = async() => {
    try {
      const response = await fetch(
        "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=fb0450ed86ba405ba3ec&consumer_secret=a7ec04e5c1f8401594d5"
      );
      if (response.status === 200) {
        const data = await response.json();
        return data.result.accessToken; // 받아온 토큰 값
      } else {
        throw new Error("Failed to fetch token");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };




//쉬발 ㅋㅋ









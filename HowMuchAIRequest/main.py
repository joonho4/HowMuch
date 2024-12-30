from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel
import json
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict, Any
# 환경 변수 로드
load_dotenv()

# OpenAI API 키 설정
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    project=os.getenv("OPENAI_API_PROJECT"),
    organization=os.getenv("OPENAI_API_ORGANIZATION"),
)

# FastAPI 앱 생성
app = FastAPI()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)  # 현재 컴퓨터의 로컬 IP 주소 사용


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 입력 데이터 모델 정의
class TripRequest(BaseModel):
    budget: int
    thema: str
    age: str
    destination: str
    travelers: int
    date: str
class RecommendationResponse(BaseModel):
    recommendation: Dict[str, Any]
@app.post("/recommend")
async def recommend_trip(request: TripRequest) -> RecommendationResponse:
    try:
        # 데이터 추출
        budget = request.budget
        thema = request.thema
        age = request.age
        destination = request.destination
        travelers = request.travelers
        date = request.date

        messages = [
            {"role": "system", "content": "당신은 여행지 추천 AI 입니다. 무조건 예산에 맞추어서 여행지를 추천해 주어야 합니다, return 방식은 json입니다."},
            {
                "role": "user",
                "content": (
                    f"사용자가 입력한 정보는 다음과 같습니다:\n"
                    f"- 예산: {budget}원\n"
                    f"- 여행지: {destination}\n"
                    f"- 여행지 테마: {thema}"
                    f"- 여행자 수: {travelers}명\n"
                    f"- 여행자 나이 : {age}"
                    f"- 여행일: {date}\n"
                    "예산을 초과하지 않는 추천 여행 일정을 JSON 형식으로 제공하세요.(JSON의 이름은 영어로 해주세요, 음식점명, 리조트명, 상호명등은 원래 이름 그대로) "
                    "만약 미성년자이라면 미성년자가 출입하지 못하는 곳은 추천하지 말아줘. "
                    "숙소, 음식점(평균 가격 포함), 추천 활동과 관련 공식 웹사이트 url이 있거나 이미지 url이 있다면 가져와 줘, 없다면 null 로 표현"
                    "계획을 짜는데 사용한 총 금액도 알려줘야해"
                    "아래와 같은 json형식으로 return해줬으면 좋겠어"
                    "사용자가 지정한 여행일 수에 맞추어서 여행 계획을 짜줘"
                    '{ \n'
                          '"recommendation": { \n'
                            '"tripPlan": [ \n'
                              '{ \n'
                                '"day1": { \n'
                                  '"morningActivity": { \n'
                                    '"activityName": 활동명, \n'
                                    '"imageURL": 이미지 주소, \n'
                                    '"websiteURL": 웹사이트 주소 \n'
                                  '}, \n'
                                  '"lunch": { \n'
                                    '"place": 음식점명, \n'
                                    '"description": 설명, \n'
                                    '"averagePrice": 평균 음식 가격, \n'
                                    '"imageURL": 이미지 주소, \n'
                                    '"websiteURL": 웹사이트 주소 \n'
                                  '}, \n'
                                  '"afternoonActivity": { \n'
                                    '"activityName": 활동명, \n'
                                    '"description": 설명, \n'
                                    '"imageURL": 이미지 주소, \n'
                                    '"websiteURL": 웹사이트 주소 \n'
                                  '}, \n'
                                  '"dinner": { \n'
                                    '"place": 음식점명, \n'
                                    '"description": 설명, \n'
                                    '"averagePrice": 평균가격, \n'
                                    '"imageURL": 이미지 주소, \n'
                                    '"websiteURL": 웹사이트 주소 \n'
                                  '}, \n'
                                  '"accommodation": {\n'
                                    '"name": 숙소명, \n'
                                    '"description": 설명, \n'
                                    '"averagePrice": 평균 음식 가격, \n'
                                    '"imageURL": 이미지 주소, \n'
                                    '"websiteURL": 웹사이트 주소 \n'
                                  '} \n'
                                '}, \n'
                                '(남은 여행일 수도 위 day1 형식처럼 표현)'
                              '} \n'
                            '], \n'
                            '"totalExpense": 총 여행 비용, \n'
                            '"thema": 사용자가 지정한 테마, \n'
                            '"place": 사용자가 지정한 지역 \n'
                          '} \n'
                    '} \n'


                ),
            }
        ]

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=2000,
            temperature=0.7  # 응답의 일관성을 위해 추가
        )

        recommendation_content = response.choices[0].message.content
        print("GPT 응답:", recommendation_content)  # 디버깅용
        recommend_json = json.loads(recommendation_content)

        # JSON 직렬화 대신 사전 그대로 반환
        return recommend_json

    except json.JSONDecodeError as e:
        print("JSON 파싱 에러:", str(e))  # 디버깅용
        raise HTTPException(status_code=500, detail="응답을 JSON으로 변환할 수 없습니다.")
    except Exception as e:
        print("일반 에러:", str(e))  # 디버깅용
        raise HTTPException(status_code=500, detail=str(e))

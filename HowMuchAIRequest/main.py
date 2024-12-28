from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel
import json
import os
from dotenv import load_dotenv

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

# 입력 데이터 모델 정의
class TripRequest(BaseModel):
    budget: int
    thema: str
    age: str
    destination: str
    travelers: int
    date: str

@app.post("/recommend")
async def recommend_trip(request: TripRequest):
    try:
        # 데이터 추출
        budget = request.budget
        thema = request.thema
        age = request.age
        destination = request.destination
        travelers = request.travelers
        date = request.date

        # OpenAI API 호출
        messages = [
            {"role": "system", "content": "당신은 여행지 추천 AI 입니다."},
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
                    "예산을 초과하지 않는 추천 여행 일정을 JSON 형식으로 제공하세요.(JSON의 이름은 영어로 해주세요, 음식점명, 리조트명, 상호명등은 최대한 한국어로) "
                    "만약 미성년자이라면 미성년자가 출입하지 못하는 곳은 추천하지 말아줘. "
                    "숙소, 음식점(평균 가격 포함), 추천 활동과 관련 공식 웹사이트 url이 있거나 이미지 url이 있다면 가져와 줘, 없다면 \"\" 로 표현"
                    "계획을 짜는데 사용한 총 금액도 알려줘야해"
                    "{\n"
            "    \"recommendation\": {\n"
            "        \"tripPlan\": {\n"
            "            \"day1\": {\n"
            "                \"morningActivity\": {\n"
            "                    \"activityName\": \"활동명\",\n"
            "                    \"imageURL\": \"이미지 주소\",\n"
            "                    \"websiteURL\": \"웹사이트 주소\"\n"
            "                },\n"
            "                \"lunch\": {\n"
            "                    \"place\": \"음식점명\",\n"
            "                    \"description\": \"설명\",\n"
            "                    \"imageURL\": \"이미지 주소\",\n"
            "                    \"websiteURL\": \"웹사이트 주소\"\n"
            "                },\n"
            "                \"afternoonActivity\": {\n"
            "                    \"activityName\": \"활동명\",\n"
            "                    \"description\": \"활동 설명\",\n"
            "                    \"imageURL\": \"이미지 주소\",\n"
            "                    \"websiteURL\": \"웹사이트 주소\"\n"
            "                },\n"
            "                \"dinner\": {\n"
            "                    \"place\": \"음식점명\",\n"
            "                    \"description\": \"설명\",\n"
            "                    \"imageURL\": \"이미지 주소\",\n"
            "                    \"websiteURL\": \"웹사이트 주소\"\n"
            "                },\n"
            "                \"accommodation\": {\n"
            "                    \"name\": \"숙소명\",\n"
            "                    \"description\": \"설명\",\n"
            "                    \"imageURL\": \"이미지 주소\",\n"
            "                    \"websiteURL\": \"웹사이트 주소\"\n"
            "                }\n"
            "            },\n"
            "           \"totalExpense\": 총 여행 비용\n" 
            "        }\n" 
            "} \n\n" 
            
           "- 항상 위 json형식으로 return해줘.\n"
            "           ... (day2 및 day3도 동일한 구조로 작성)\n\n"
                ),
            }
        ]

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            max_tokens=2000
        )

        recommendation_content = response.choices[0].message.content
        recommendation_json = json.loads(recommendation_content)

        return {
            "recommendation": recommendation_json
        }
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="응답을 JSON으로 변환할 수 없습니다.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

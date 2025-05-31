# Team 404-Found: myball

## 제출물 실행 방법

## 🔧 기술 스택

- **Frontend**: React (React Router, Context API)
- **Backend**: Node.js (Express)
- **Database**: MySQL (Sequelize ORM)
- **Styling**: CSS, JavaScript

## 백엔드 실행방법

1. 프로젝트 클론

```bash
git clone https://github.com/junhyeok0331/myball_project.git
cd myball_project/backend
```

2. 패키지 설치

```bash
npm install
```

3. 환경 변수 설정
.env 파일을 생성하고 아래 정보를 입력하세요
(값은 실제 서버 환경에 맞게 작성)

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=myball
PORT=3001
```

4. 데이터 베이스 초기화
myball_project/backend 위치에서

```bash
node initDB.js //실행
```

5. 서버 실행

```bash
npm start
```

## 프론트엔드 실행방법

1. 프로젝트 클론
백엔드와 동일하게 실행
myball 위치에서 동작

2. 패키지 설치
백엔드와 동일하게 실행

3. 기본 접속 주소

.env 파일에 백엔드 API 주소 설정

4. React 개발 서버 실행

```bash
npm start
```

## DB 설계 (현재 상황)

![DB 설계도](https://github.com/user-attachments/assets/20f5b533-422f-47cc-a2f3-a04b08e995d7)

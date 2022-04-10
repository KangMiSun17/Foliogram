# 포트폴리오 공유 서비스 백엔드 코드

## 실행 방법

> .env 설정이 필요합니다.

```.env
SERVER_DOMAIN='http://localhost'
SERVER_PORT=port 번호
MONGODB_URL='mongodb 주소'
SERVICE_DOMAIN='http://localhost:3000'
JWT_SECRET_KEY='JWT Key'
IMAGE_ENDPOINT='이미지 cloud 주소'
IMAGE_ACCESSKEY='이미지 cloud access key'
IMAGE_SECRETACCESSKEY='이미지 cloud secret key'
IMAGE_BUCKET='team5'
DEBUG=3
```

```bash
npm install --global yarn
yarn install
yarn start
```

---

## 개발 내역

- 스펙 관련 MVP 구현(학력, 경력 등)
- 코드 통합
- 로거
- 이미지 업로드 API 구현
- 댓글 API 구현
- 팔로우 API 구현
- 이메일 인증 구현

---

## 디렉토리 구조

```bash
📦src
 ┣ 📂db
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Award.js
 ┃ ┃ ┣ 📜BaseModelWrapper.js
 ┃ ┃ ┣ 📜Career.js
 ┃ ┃ ┣ 📜Certificate.js
 ┃ ┃ ┣ 📜Comment.js
 ┃ ┃ ┣ 📜Education.js
 ┃ ┃ ┣ 📜Project.js
 ┃ ┃ ┣ 📜TechStack.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┣ 📂schemas
 ┃ ┃ ┣ 📜award.js
 ┃ ┃ ┣ 📜career.js
 ┃ ┃ ┣ 📜certificate.js
 ┃ ┃ ┣ 📜comment.js
 ┃ ┃ ┣ 📜education.js
 ┃ ┃ ┣ 📜project.js
 ┃ ┃ ┣ 📜techstack.js
 ┃ ┃ ┗ 📜user.js
 ┃ ┗ 📜index.js
 ┣ 📂middlewares
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┗ 📜login_required.js
 ┣ 📂routers
 ┃ ┣ 📜awardRouter.js
 ┃ ┣ 📜careerRouter.js
 ┃ ┣ 📜certificateRouter.js
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜educationRouter.js
 ┃ ┣ 📜projectRouter.js
 ┃ ┣ 📜techStackRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜awardService.js
 ┃ ┣ 📜BaseService.js
 ┃ ┣ 📜careerService.js
 ┃ ┣ 📜certificateService.js
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜educationService.js
 ┃ ┣ 📜projectService.js
 ┃ ┣ 📜techStackService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┣ 📜errors.js
 ┃ ┣ 📜logging.js
 ┃ ┣ 📜regexTools.js
 ┃ ┗ 📜status.js
 ┣ 📜.prettierrc
 ┗ 📜app.js
```

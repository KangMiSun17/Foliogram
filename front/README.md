# Foliogram 프론트엔드

## 실행 방법

```bash
npm install --global yarn
yarn install
yarn start
```

---

## 개발 내역

- 스펙 관련 MVP 구현(학력, 경력 등)
- 비밀번호 강도검사
- 프로필 이미지 업로드 기능 구현
- 사용자가 보여 줄 MVP 네비게이션바 구현
- 카테고리 기능 구현
- 댓글 기능 구현
- 팔로우 기능 구현

---

## 디렉토리 구조

```bash
📦src
 ┣ 📂components
 ┃ ┣ 📂award
 ┃ ┃ ┣ 📜Award.js
 ┃ ┃ ┣ 📜AwardAddForm.js
 ┃ ┃ ┣ 📜AwardCard.js
 ┃ ┃ ┣ 📜AwardEditForm.js
 ┃ ┃ ┣ 📜Awards.js
 ┃ ┃ ┗ 📜README.md
 ┃ ┣ 📂career
 ┃ ┃ ┣ 📜Career.js
 ┃ ┃ ┣ 📜CareerAddForm.js
 ┃ ┃ ┣ 📜CareerCard.js
 ┃ ┃ ┣ 📜CareerEditForm.js
 ┃ ┃ ┗ 📜Careers.js
 ┃ ┣ 📂certificate
 ┃ ┃ ┣ 📜Certificate.js
 ┃ ┃ ┣ 📜CertificateAddForm.js
 ┃ ┃ ┣ 📜CertificateCard.js
 ┃ ┃ ┣ 📜CertificateEditForm.js
 ┃ ┃ ┗ 📜Certificates.js
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜CommentAddForm.js
 ┃ ┃ ┣ 📜CommentCard.js
 ┃ ┃ ┣ 📜CommentDate.js
 ┃ ┃ ┣ 📜CommentEditForm.js
 ┃ ┃ ┣ 📜Comments.js
 ┃ ┃ ┗ 📜SelectOption.js
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂context
 ┃ ┃ ┃ ┣ 📜Context.js
 ┃ ┃ ┃ ┗ 📜UserContext.js
 ┃ ┃ ┣ 📜Button.js
 ┃ ┃ ┣ 📜DateUtil.js
 ┃ ┃ ┣ 📜Form.js
 ┃ ┃ ┗ 📜validateUtil.js
 ┃ ┣ 📂education
 ┃ ┃ ┣ 📜Education.js
 ┃ ┃ ┣ 📜EducationAddForm.js
 ┃ ┃ ┣ 📜EducationCard.js
 ┃ ┃ ┣ 📜EducationEditForm.js
 ┃ ┃ ┗ 📜Educations.js
 ┃ ┣ 📂nav
 ┃ ┃ ┣ 📜Empty.js
 ┃ ┃ ┣ 📜NavBar.js
 ┃ ┃ ┗ 📜NoneClick.js
 ┃ ┣ 📂project
 ┃ ┃ ┣ 📜Project.js
 ┃ ┃ ┣ 📜ProjectAddForm.js
 ┃ ┃ ┣ 📜ProjectCard.js
 ┃ ┃ ┣ 📜ProjectEditForm.js
 ┃ ┃ ┗ 📜Projects.js
 ┃ ┣ 📂techstack
 ┃ ┃ ┣ 📜TechStack.js
 ┃ ┃ ┣ 📜TechStackAddForm.js
 ┃ ┃ ┣ 📜TechStackCard.js
 ┃ ┃ ┣ 📜TechStackEditForm.js
 ┃ ┃ ┗ 📜TechStacks.js
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜Category.js
 ┃ ┃ ┣ 📜Follow.js
 ┃ ┃ ┣ 📜Follows.js
 ┃ ┃ ┣ 📜LoginForm.js
 ┃ ┃ ┣ 📜Network.js
 ┃ ┃ ┣ 📜ProfileImage.js
 ┃ ┃ ┣ 📜RegisterForm.js
 ┃ ┃ ┣ 📜User.js
 ┃ ┃ ┣ 📜UserCard.js
 ┃ ┃ ┣ 📜UserDelete.js
 ┃ ┃ ┗ 📜UserEditForm.js
 ┃ ┣ 📜Footer.js
 ┃ ┣ 📜Header.js
 ┃ ┣ 📜Main.js
 ┃ ┗ 📜Portfolio.js
 ┣ 📜api.js
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜reducer.js
```

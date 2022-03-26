# Portfolio Generic API

사용자에게 속한 여러 가지 포트폴리오 레코드를 다루는 API입니다.

전부 로그인이 필요합니다.

<br>

<br>

---

- [Portfolio Generic API](#portfolio-generic-api)
  - [인증](#인증)
  - [포트폴리오 레코드 종류](#포트폴리오-레코드-종류)
  - [레코드 생성](#레코드-생성)
    - [요청](#요청)
    - [응답 `status` 예시](#응답-status-예시)
    - [응답 `data` 예시](#응답-data-예시)
  - [개별 레코드 조회](#개별-레코드-조회)
    - [요청](#요청-1)
    - [응답 `status` 예시](#응답-status-예시-1)
  - [사용자별 레코드 전체 조회](#사용자별-레코드-전체-조회)
    - [요청](#요청-2)
    - [응답 `status` 예시](#응답-status-예시-2)
    - [응답 `data` 예시](#응답-data-예시-1)
  - [레코드 수정](#레코드-수정)
    - [요청](#요청-3)
    - [응답 `status` 예시](#응답-status-예시-3)
    - [응답 `data` 예시](#응답-data-예시-2)
  - [레코드 삭제](#레코드-삭제)
    - [요청](#요청-4)
    - [응답 `status` 예시](#응답-status-예시-4)

---

<br>

## 인증

```json
{
  "Authorization": "bearer {{TOKEN}}"
}
```

---

<br>

## 포트폴리오 레코드 종류

- **Award**: 사용자의 수상 이력입니다.
- **Career**: 사용자의 근무 경력입니다.
- **Certificate**: 사용자의 자격증 취득 이력입니다.
- **Education**: 사용자의 학력입니다.
- **Project**: 사용자가 참여했던 프로젝트 이력입니다.
- **Tech Stack**: 사용자의 기술 스택입니다.

<br>

---

## 레코드 생성

<br>

### 요청

<br>

> **요청 주소**
>
> - Award: `POST /award/create`
> - Career: `POST /career/create`
> - Certificate: `POST /certificate/create`
> - Education: `POST /education/create`
> - Project: `POST /project/create`
> - Tech Stack: `POST /techstack/create`

- `Headers`

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- `Body`

  > - 모든 레코드에는 표에 나오지 않아도 `user_id: uuid` 필드가 필수적입니다.
  > - 모든 필드는 문자열입니다.
  > - 날짜 필드 (`xxx_date`) 형식은 지역 시간 기준으로 `YYYY-MM-DD` 입니다.

  <br>
  <br>

  | Record      | Required fields               | Optional fields          | Note |
  | ----------- | ----------------------------- | ------------------------ | ---- |
  | Award       | `title`                       | `description`            |      |
  | Career      | `title`, `from_date`          | `to_date`, `description` |      |
  | Certificate | `title`, `when_date`          | `description`            |      |
  | Education   | `school`, `major`, `position` | -                        |      |
  | Project     | `title`, `from_date`          | `to_date`, `description` |      |
  | Tech Stack  | `title`                       | `description`            |      |

---

<br>

### 응답 `status` 예시

- 성공

  `201 Created`

- 실패

  - 필수 필드가 빠졌을 때

    `400 Bad Request`

    ```json
    {
      "errorMessage": "User {8f356c73-8e68-4d5e-85b8-c355989e2f81 is not allwed to modify data of user {8b059a18-d745-4caf-95b4-926aff913092}",
      "result": false
    }
    ```

  - `user_id` 값이 로그인한 사용자의 `id: uuid` 값이 다를 때

    `403 Forbidden`

    ```json
    {
      "errorMessage": "title field is required for award record",
      "result": false
    }
    ```

### 응답 `data` 예시

- Award

  ```json
  {
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "user_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "빵상",
    "description": "빵↘빵↗ 똥똥똥똥 땅땅 따라라라~↘ 따띵↘ 똥똥똥똥 띵↘똥똥↗↗",
    "_id": "6232aa5c7b427feb719300a5",
    "__v": 0
  }
  ```

- Career

  ```json
  {
    "user_id": "8b059a18-d745-4caf-95b4-926aff913092",
    "title": "산업 연수생",
    "description": "인도에서 산업 연수생으로 한국에 왔는데, 저는 반장님 지시로 화장실 청소를 했습니다.\n\n어느날 사장님이 담베 심부름을 시키셔서 화장실 청소를 하지 못했는데 그래서 많이 맞았습니다.\n\n나중에 정월 대보름에 한국의 아름다운 풍습인 쥐불놀이를 하다가 공장이 불타서 퇴사했습니다.",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20"
  }
  ```

- Certificate

  ```json
  {
    "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
    "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
    "title": "까방권",
    "when_date": "2022-02-05",
    "description": "본 자격증은 소지자가 평생 무슨 짓을 해도 까이지 않을 자격이 있음을 증명합니다.",
    "_id": "62354b77832b04638ab0eac4",
    "createdAt": "2022-03-19T03:18:15.622Z",
    "updatedAt": "2022-03-19T03:18:15.622Z",
    "__v": 0
  }
  ```

- Education

  ```json
  {
    "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
    "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
    "school": "피자스쿨",
    "major": "벌집핏자영양학과",
    "position": "요리사 중퇴",
    "_id": "62354e17832b04638ab0ead5",
    "createdAt": "2022-03-19T03:29:27.163Z",
    "updatedAt": "2022-03-19T03:29:27.163Z",
    "__v": 0
  }
  ```

- Project

  ```json
  {
    "_id": "623342a1bf40c336b72d1a4b",
    "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
    "user_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "react가 아니고 express 프로젝트",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20",
    "description": "알고 보니 제가 했던게 react가 아니고 express였습니다. 충격!",
    "__v": 0
  }
  ```

- Tech Stack

  ```json
  {
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "user_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "LOLCODE",
    "description": "HAI 1.2\n  CAN HAS STDIO?\n  VISIBLE\n \"HAI WORLD!!!1!\"\nKTHXBYE",
    "_id": "6232aa5c7b427feb719300a5",
    "__v": 0
  }
  ```

---

<br>

## 개별 레코드 조회

<br>

### 요청

<br>

> **요청 주소**
>
> - Award: `GET /awards/:id`
> - Career: `GET /careers/:id`
> - Certificate: `GET /certificates/:id`
> - Education: `GET /educations/:id`
> - Project: `GET /projects/:id`
> - Tech Stack: `GET /techstacks/:id`

---

<br>

### 응답 `status` 예시

- 성공

  `200 OK`

- 실패

  - 요청한 `id` 값과 일치하는 레코드가 없을 때

    `404 Not Found`

    ```json
    {
      "errorMessage": "record {9d4e0389-a005-41bd-b238-d1c2f5c7a09f} not found",
      "result": false
    }
    ```

<br>

---

## 사용자별 레코드 전체 조회

<br>

### 요청

<br>

> **요청 주소**
>
> - Award: `GET /awardlist/:user_id`
> - Career: `GET /careerlist/:user_id`
> - Certificate: `GET /certificatelist/:user_id`
> - Education: `GET /educationlist/:user_id`
> - Project: `GET /projectlist/:user_id`
> - Tech Stack: `GET /techstacklist/:user_id`

---

<br>

### 응답 `status` 예시

- 성공

  `200 OK`

### 응답 `data` 예시

- 성공

  사용자에게 속한 종류가 같은 모든 레코드가 배열로 반환됩니다.

- 실패

  실패하지는 않고 레코드가 없으면 빈 배열이 반환됩니다.

  ```json
  []
  ```

<br>

---

## 레코드 수정

<br>

### 요청

<br>

> **요청 주소**
>
> - Award: `PUT /awards/:user_id`
> - Career: `PUT /careers/:user_id`
> - Certificate: `PUT /certificates/:user_id`
> - Education: `PUT /educations/:user_id`
> - Project: `PUT /projects/:user_id`
> - Tech Stack: `PUT /techstacks/:user_id`

- `Headers`

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- `Body`

  > - 필수 필드는 없습니다.
  > - 모든 필드는 문자열입니다.
  > - 날짜 필드 (`xxx_date`) 형식은 지역 시간 기준으로 `YYYY-MM-DD` 입니다.

  <br>
  <br>

  | Record      | Modifiable fields                              | Note |
  | ----------- | ---------------------------------------------- | ---- |
  | Award       | `title`, `description`                         |      |
  | Career      | `title`, `from_date`, `to_date`, `description` |      |
  | Certificate | `title`, `when_date`, `description`            |      |
  | Education   | `school`, `major`, `position`                  |      |
  | Project     | `title`, `from_date`, `to_date`, `description` |      |
  | Tech Stack  | `title`, `description`                         |      |

---

<br>

### 응답 `status` 예시

- 성공

  `200 OK`

- 실패

  - `user_id` 값이 로그인한 사용자의 `id: uuid` 값이 다를 때

    `403 Forbidden`

    ```json
    {
      "errorMessage": "title field is required for award record",
      "result": false
    }
    ```

### 응답 `data` 예시

[레코드 생성](#레코드-생성) 시와 같습니다.

<br>

---

<br>

## 레코드 삭제

<br>

### 요청

<br>

> **요청 주소**
>
> - Award: `DELETE /awards/:id`
> - Career: `DELETE /careers/:id`
> - Certificate: `DELETE /certificates/:id`
> - Education: `DELETE /educations/:id`
> - Project: `DELETE /projects/:id`
> - Tech Stack: `DELETE /techstacks/:id`

---

<br>

### 응답 `status` 예시

- 성공

  `200 OK`

  ```json
  {
    "result": true
  }
  ```

- 실패

  - 요청한 `id` 값과 일치하는 레코드가 없을 때

    `404 Not Found`

    ```json
    {
      "errorMessage": "record {9d4e0389-a005-41bd-b238-d1c2f5c7a09f} not found",
      "result": false
    }
    ```

  - 로그인한 사용자의 `id: uuid` 값과 레코드가 속한 사용자의 `id: uuid` 값이 다를 때

    `403 Forbidden`

    ```json
    {
      "errorMessage": "title field is required for award record",
      "result": false
    }
    ```

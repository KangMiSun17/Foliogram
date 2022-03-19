# Project API

사용자의 프로젝트 이력 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

- [Project API](#project-api)
  - [인증](#인증)
  - [프로젝트 정보 생성](#프로젝트-정보-생성)
    - [요청](#요청)
    - [응답](#응답)
  - [개별 프로젝트 정보 조회](#개별-프로젝트-정보-조회)
    - [요청](#요청-1)
    - [응답](#응답-1)
  - [프로젝트 정보 수정](#프로젝트-정보-수정)
    - [요청](#요청-2)
    - [응답](#응답-2)
  - [사용자별 프로젝트 정보 목록 조회](#사용자별-프로젝트-정보-목록-조회)
    - [요청](#요청-3)
    - [응답](#응답-3)
  - [프로젝트 정보 삭제](#프로젝트-정보-삭제)
    - [요청](#요청-4)
    - [응답](#응답-4)

<br>

---

---

<br>

## 인증

```json
{
  "authorization": "bearer {{TOKEN}}"
}
```

<br>

---

## 프로젝트 정보 생성

<br>

### 요청

<br>

> `POST /project/create`

- Headers

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- Body

  | <!-- -->  | <!-- -->                        |
  | --------- | ------------------------------- |
  | 필수 필드 | `user_id`, `title`, `from_date` |

  | <!-- -->    | <!-- -->                 |
  | ----------- | ------------------------ |
  | 비필수 필드 | `to_date`, `description` |

  ```json
  {
    "user_id": "{{user_id}}",
    "title": "react 프로젝트",
    "description": "프론트엔드 역량을 키웠습니다!",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20"
  }
  ```

### 응답

- data

  ```json
  {
    "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
    "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "react 프로젝트",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20",
    "description": "프론트엔드 역량을 키웠습니다!",
    "_id": "623342a1bf40c336b72d1a4b",
    "__v": 0
  }
  ```

- Error

  다음 상황에 에러가 발생합니다.

  - 필수 필드가 바디에 없는 경우
  - 바디에 있는 `user_id`와 현재 로그인한 사용자의 `uuid`가 다른 경우

<br>

---

## 개별 프로젝트 정보 조회

<br>

### 요청

<br>

> `GET /projects/:id`

`id` 는 개별 프로젝트 정보의 `id`입니다.

### 응답

- data

  ```json
  {
    "_id": "623342a1bf40c336b72d1a4b",
    "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
    "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "react 프로젝트",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20",
    "description": "프론트엔드 역량을 키웠습니다!",
    "__v": 0
  }
  ```

- Error

  없음

<br>

---

## 프로젝트 정보 수정

<br>

### 요청

<br>

> `PUT /projects/:id`

`id` 는 개별 프로젝트 정보의 `id`입니다.

- Headers

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- Body

  | <!-- -->  | <!-- --> |
  | --------- | -------- |
  | 필수 필드 | 없음     |

  | <!-- -->    | <!-- -->                                       |
  | ----------- | ---------------------------------------------- |
  | 비필수 필드 | `title`, `description`, `from_date`, `to_date` |

  ```json
  {
    "title": "react가 아니고 express 프로젝트",
    "description": "알고 보니 제가 했던게 react가 아니고 express였습니다. 충격!",
    "dud": "이 데이터는 필요 없고 저장되어선 안 됩니다."
  }
  ```

### 응답

- data

  수정 전

  ```json
  {
    "_id": "623342a1bf40c336b72d1a4b",
    "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
    "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "react 프로젝트",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20",
    "description": "프론트엔드 역량을 키웠습니다!",
    "__v": 0
  }
  ```

  수정 후

  ```json
  {
    "_id": "623342a1bf40c336b72d1a4b",
    "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
    "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "react가 아니고 express 프로젝트",
    "from_date": "2021-03-20",
    "to_date": "2021-04-20",
    "description": "알고 보니 제가 했던게 react가 아니고 express였습니다. 충격!",
    "__v": 0
  }
  ```

- Error

  다음 상황에 에러가 발생합니다.

  - 프로젝트 정보를 찾을 수 없는 경우
  - 프로젝트 정보에 기록된 프로젝트 참여여자와 현재 로그인한 사용자가 다른 경우

<br>

---

## 사용자별 프로젝트 정보 목록 조회

<br>

### 요청

<br>

> `GET /projectlist/:user_id`

### 응답

- data

  ```json
  [
    {
      "_id": "623342a1bf40c336b72d1a4b",
      "id": "7192f66a-45e2-44fc-b5ea-afddfeb433bc",
      "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
      "title": "react가 아니고 express 프로젝트",
      "from_date": "2021-03-20",
      "to_date": "2021-04-20",
      "description": "알고 보니 제가 했던게 react가 아니고 express였습니다. 충격!",
      "__v": 0
    },
    {
      "_id": "62335179a86714e34986c893",
      "id": "6e97f8ba-ce74-4317-bc05-54ac2b0111a1",
      "participant_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
      "title": "future 프로젝트",
      "from_date": "2221-03-20",
      "to_date": "2221-04-20",
      "description": "저는 미래에서 왔습니다. 질문 받습니다.",
      "__v": 0
    }
  ]
  ```

- Error

  없음

<br>

---

## 프로젝트 정보 삭제

<br>

### 요청

<br>

> `DELETE /projects/:id`

`id` 는 개별 프로젝트 정보의 `id`입니다.

### 응답

- data

  성공 시

  ```json
  {
    "result": true
  }
  ```

- Error

  다음 상황에 에러가 발생합니다.

  - 프로젝트 정보를 찾을 수 없는 경우

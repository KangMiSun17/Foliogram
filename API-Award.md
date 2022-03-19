# Award API

사용자의 수상 내력 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

- [Award API](#award-api)
  - [인증](#인증)
  - [수상 정보 생성](#수상-정보-생성)
    - [요청](#요청)
    - [응답](#응답)
  - [개별 수상 정보 조회](#개별-수상-정보-조회)
    - [요청](#요청-1)
    - [응답](#응답-1)
  - [수상 정보 수정](#수상-정보-수정)
    - [요청](#요청-2)
    - [응답](#응답-2)
  - [사용자별 수상 정보 목록 조회](#사용자별-수상-정보-목록-조회)
    - [요청](#요청-3)
    - [응답](#응답-3)
  - [수상 정보 삭제](#수상-정보-삭제)
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

## 수상 정보 생성

<br>

### 요청

<br>

> `POST /award/create`

- Headers

  ```json
  {
    "Content-Type": "application/json"
  }
  ```

- Body

  | <!-- -->  | <!-- -->           |
  | --------- | ------------------ |
  | 필수 필드 | `user_id`, `title` |

  | <!-- -->    | <!-- -->      |
  | ----------- | ------------- |
  | 비필수 필드 | `description` |

  ```json
  {
    "user_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "Awesome Award",
    "description": "This person is super awesome."
  }
  ```

### 응답

- data

  ```json
  {
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "awardee_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "Awesome Award",
    "description": "This person is super awesome.",
    "_id": "6232aa5c7b427feb719300a5",
    "__v": 0
  }
  ```

- Error

  다음 상황에 에러가 발생합니다.

  - 필수 필드가 바디에 없는 경우
  - 바디에 있는 `user_id`와 현재 로그인한 사용자의 `uuid`가 다른 경우

<br>

---

## 개별 수상 정보 조회

<br>

### 요청

<br>

> `GET /awards/:id`

`id` 는 개별 수상 정보의 `id`입니다.

### 응답

- data

  ```json
  {
    "_id": "6232aa5c7b427feb719300a5",
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "awardee_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "Awesome Award",
    "description": "설명이 아직 없습니다. 추가해 주세요.",
    "__v": 0
  }
  ```

- Error

  없음

<br>

---

## 수상 정보 수정

<br>

### 요청

<br>

> `PUT /awards/:id`

`id` 는 개별 수상 정보의 `id`입니다.

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

  | <!-- -->    | <!-- -->               |
  | ----------- | ---------------------- |
  | 비필수 필드 | `title`, `description` |

  ```json
  {
    "title": "Awesomer Award",
    "description": "This awardee was given this most honourable award for being extraordinarily awesome."
  }
  ```

### 응답

- data

  수정 전

  ```json
  {
    "_id": "6232aa5c7b427feb719300a5",
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "awardee_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "Awesome Award",
    "description": "설명이 아직 없습니다. 추가해 주세요.",
    "__v": 0
  }
  ```

  수정 후

  ```json
  {
    "_id": "6232aa5c7b427feb719300a5",
    "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
    "awardee_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
    "title": "Awesomer Award",
    "description": "This awardee was given this most honourable award for being extraordinarily awesome.",
    "__v": 0
  }
  ```

- Error

  다음 상황에 에러가 발생합니다.

  - 수상 정보를 찾을 수 없는 경우
  - 수상 정보에 기록된 수상자와 현재 로그인한 사용자가 다른 경우

<br>

---

## 사용자별 수상 정보 목록 조회

<br>

### 요청

<br>

> `GET /awardlist/:user_id`

### 응답

- data

  ```json
  [
    {
      "_id": "6232aa5c7b427feb719300a5",
      "id": "9d4e0389-a005-41bd-b238-d1c2f5c7a09f",
      "awardee_id": "8f356c73-8e68-4d5e-85b8-c355989e2f81",
      "title": "Awesomer Award",
      "description": "This awardee was given this most honourable award for being extraordinarily awesome.",
      "__v": 0
    }
  ]
  ```

- Error

  없음

<br>

---

## 수상 정보 삭제

<br>

### 요청

<br>

> `DELETE /awards/:id`

`id` 는 개별 수상 정보의 `id`입니다.

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

  - 수상 정보를 찾을 수 없는 경우

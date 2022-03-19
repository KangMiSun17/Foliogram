# Certificate API

사용자의 자격증 내력 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

-   [Certifiate API](#certificate-api)
    -   [인증](#인증)
    -   [자격증 정보 생성](#자격증-정보-생성)
        -   [요청](#요청)
        -   [응답](#응답)
    -   [개별 자격증 정보 조회](#개별-자격증-정보-조회)
        -   [요청](#요청-1)
        -   [응답](#응답-1)
    -   [자격증 정보 수정](#자격증-정보-수정)
        -   [요청](#요청-2)
        -   [응답](#응답-2)
    -   [사용자별 자격증 정보 목록 조회](#사용자별-자격증-정보-목록-조회)
        -   [요청](#요청-3)
        -   [응답](#응답-3)
    -   [자격증 정보 삭제](#자격증-정보-삭제)
        -   [요청](#요청-4)
        -   [응답](#응답-4)

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

## 자격증 정보 생성

<br>

### 요청

<br>

> `POST /certificates/create`

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

    | <!-- -->  | <!-- -->                       |
    | --------- | ------------------------------ |
    | 필수 필드 | `user_id`, `title`,`when_date` |

    | <!-- -->    | <!-- -->      |
    | ----------- | ------------- |
    | 비필수 필드 | `description` |

    ```json
    {
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "title": "Test certificate",
        "description": "This is test certificate",
        "when_date": "2022-02-05"
    }
    ```

### 응답

-   data

    ```json
    {
        "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "title": "Test certificate",
        "when_date": "2022-02-05",
        "description": "This is test certificate",
        "_id": "62354b77832b04638ab0eac4",
        "createdAt": "2022-03-19T03:18:15.622Z",
        "updatedAt": "2022-03-19T03:18:15.622Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   필수 필드가 바디에 없는 경우
    -   바디에 있는 `user_id`와 현재 로그인한 사용자의 `uuid`가 다른 경우

<br>

---

## 개별 자격증 정보 조회

<br>

### 요청

<br>

> `GET /certificates/:id`

`id` 는 개별 자격증 정보의 `id`입니다.

### 응답

-   data

    ```json
    {
        "_id": "62354b77832b04638ab0eac4",
        "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "title": "Test certificate",
        "when_date": "2022-02-05",
        "description": "This is test certificate",
        "createdAt": "2022-03-19T03:18:15.622Z",
        "updatedAt": "2022-03-19T03:18:15.622Z",
        "__v": 0
    }
    ```

-   Error

    없음

<br>

---

## 자격증 정보 수정

<br>

### 요청

<br>

> `PUT /certificates/:id`

`id` 는 개별 자격증 정보의 `id`입니다.

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

    | <!-- -->  | <!-- --> |
    | --------- | -------- |
    | 필수 필드 | 없음     |

    | <!-- -->    | <!-- -->                           |
    | ----------- | ---------------------------------- |
    | 비필수 필드 | `title`, `description`,`when_date` |

    ```json
    {
        "title": "This is certificate2",
        "when_date": "2022-02-12",
        "description": "This is updated"
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "_id": "62354b77832b04638ab0eac4",
        "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "title": "Test certificate",
        "when_date": "2022-02-05",
        "description": "This is test certificate",
        "createdAt": "2022-03-19T03:18:15.622Z",
        "updatedAt": "2022-03-19T03:18:15.622Z",
        "__v": 0
    }
    ```

    수정 후

    ```json
    {
        "_id": "62354b77832b04638ab0eac4",
        "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "title": "This is certificate2",
        "when_date": "2022-02-12",
        "description": "This is updated",
        "createdAt": "2022-03-19T03:18:15.622Z",
        "updatedAt": "2022-03-19T03:20:53.170Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   자격증 정보를 찾을 수 없는 경우
    -   자격증 정보에 기록된 수상자와 현재 로그인한 사용자가 다른 경우

<br>

---

## 사용자별 자격증 정보 목록 조회

<br>

### 요청

<br>

> `GET /certificatelist/:user_id`

### 응답

-   data

    ```json
    [
        {
            "_id": "62354b77832b04638ab0eac4",
            "id": "8ff723a6-72aa-4df6-9149-72233cf8675a",
            "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
            "title": "This is certificate2",
            "when_date": "2022-02-12",
            "description": "This is updated",
            "createdAt": "2022-03-19T03:18:15.622Z",
            "updatedAt": "2022-03-19T03:20:53.170Z",
            "__v": 0
        }
    ]
    ```

-   Error

    없음

<br>

---

## 자격증 정보 삭제

<br>

### 요청

<br>

> `DELETE /certificates/:id`

`id` 는 개별 자격증 정보의 `id`입니다.

### 응답

-   data

    성공 시

    ```json
    {
        "result": true
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   자격증 정보를 찾을 수 없는 경우
    -   자격증 정보에 기록된 수상자와 현재 로그인한 사용자가 다른 경우

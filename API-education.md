# Education API

사용자의 학력 내력 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

-   [Education API](#education-api)
    -   [인증](#인증)
    -   [학력 정보 생성](#학력-정보-생성)
        -   [요청](#요청)
        -   [응답](#응답)
    -   [개별 학력 정보 조회](#개별-학력-정보-조회)
        -   [요청](#요청-1)
        -   [응답](#응답-1)
    -   [학력 정보 수정](#학력-정보-수정)
        -   [요청](#요청-2)
        -   [응답](#응답-2)
    -   [사용자별 학력 정보 목록 조회](#사용자별-학력-정보-목록-조회)
        -   [요청](#요청-3)
        -   [응답](#응답-3)
    -   [학력 정보 삭제](#학력-정보-삭제)
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

## 학력 정보 생성

<br>

### 요청

<br>

> `POST /education/create`

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

    | <!-- -->  | <!-- -->                               |
    | --------- | -------------------------------------- |
    | 필수 필드 | `user_id`, `school`,`major`,`position` |

    | <!-- -->    | <!-- --> |
    | ----------- | -------- |
    | 비필수 필드 | 없음     |

    ```json
    {
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "school": "Test university",
        "major": "Test major",
        "position": "graduated"
    }
    ```

### 응답

-   data

    ```json
    {
        "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "school": "Test university",
        "major": "Test major",
        "position": "graduated",
        "_id": "62354e17832b04638ab0ead5",
        "createdAt": "2022-03-19T03:29:27.163Z",
        "updatedAt": "2022-03-19T03:29:27.163Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   필수 필드가 바디에 없는 경우
    -   바디에 있는 `user_id`와 현재 로그인한 사용자의 `uuid`가 다른 경우

<br>

---

## 개별 학력 정보 조회

<br>

### 요청

<br>

> `GET /educations/:id`

`id` 는 개별 학력 정보의 `id`입니다.

### 응답

-   data

    ```json
    {
        "_id": "62354e17832b04638ab0ead5",
        "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "school": "Test university",
        "major": "Test major",
        "position": "graduated",
        "createdAt": "2022-03-19T03:29:27.163Z",
        "updatedAt": "2022-03-19T03:29:27.163Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   자격증 정보를 찾을 수 없는 경우

<br>

---

## 학력 정보 수정

<br>

### 요청

<br>

> `PUT /educations/:id`

`id` 는 개별 학력 정보의 `id`입니다.

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

    | <!-- -->    | <!-- -->                     |
    | ----------- | ---------------------------- |
    | 비필수 필드 | `school`, `major`,`position` |

    ```json
    {
        "school": "Test university2",
        "major": "Test2 major",
        "position": "attending"
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "_id": "62354e17832b04638ab0ead5",
        "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "school": "Test university",
        "major": "Test major",
        "position": "graduated",
        "createdAt": "2022-03-19T03:29:27.163Z",
        "updatedAt": "2022-03-19T03:29:27.163Z",
        "__v": 0
    }
    ```

    수정 후

    ```json
    {
        "_id": "62354e17832b04638ab0ead5",
        "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
        "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
        "school": "Test university2",
        "major": "Test2 major",
        "position": "attending",
        "createdAt": "2022-03-19T03:29:27.163Z",
        "updatedAt": "2022-03-19T03:34:55.300Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   학력 정보를 찾을 수 없는 경우
    -   학력 정보에 기록된 수상자와 현재 로그인한 사용자가 다른 경우

<br>

---

## 사용자별 학력 정보 목록 조회

<br>

### 요청

<br>

> `GET /educationlist/:user_id`

### 응답

-   data

    ```json
    [
        {
            "_id": "62354e17832b04638ab0ead5",
            "id": "9801cf6f-e4c6-47e6-a927-4692cbaf2bb8",
            "user_id": "2dfb31e4-a3d3-40e2-8dda-42abd33e85ae",
            "school": "Test university2",
            "major": "Test2 major",
            "position": "attending",
            "createdAt": "2022-03-19T03:29:27.163Z",
            "updatedAt": "2022-03-19T03:34:55.300Z",
            "__v": 0
        }
    ]
    ```

-   Error

    없음

<br>

---

## 학력 정보 삭제

<br>

### 요청

<br>

> `DELETE /educations/:id`

`id` 는 개별 학력 정보의 `id`입니다.

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

    -   학력 정보를 찾을 수 없는 경우
    -   학력 정보에 기록된 수상자와 현재 로그인한 사용자가 다른 경우

# Comment API

사용자의 댓글 내력 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

-   [Comment API](#comment-api)
    -   [인증](#인증)
    -   [댓글 정보 생성](#댓글-정보-생성)
        -   [요청](#요청)
        -   [응답](#응답)
    -   [개별 댓글 정보 조회](#개별-댓글-정보-조회)
        -   [요청](#요청-1)
        -   [응답](#응답-1)
    -   [댓글 정보 수정](#댓글-정보-수정)
        -   [요청](#요청-2)
        -   [응답](#응답-2)
    -   [사용자별 댓글 정보 목록 조회](#사용자별-댓글-정보-목록-조회)
        -   [요청](#요청-3)
        -   [응답](#응답-3)
    -   [댓글 정보 삭제](#댓글-정보-삭제)
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

## 댓글 정보 생성

<br>

### 요청

<br>

> `POST /comments/create`

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

        | <!-- -->  | <!-- -->                               |
        | --------- | -------------------------------------- |
        | 필수 필드 | `user_id`, `content`,`target_user_id`|

        | <!-- -->    | <!-- --> |
        | ----------- | -------- |
        | 비필수 필드 | 없음     |

    ```json
    {
        "user_id": "7a282a61-d92a-464c-bbc4-4591dc751149",
        "content": "test...1341341432555554433332",
        "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da"
    }
    ```

### 응답

-   data

    ```json
    {
        "id": "f9ab2fa0-4008-41d9-82cf-65b8df8e152d",
        "content": "test...1341341432555554433332",
        "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
        "user_id": {
            "id": "7a282a61-d92a-464c-bbc4-4591dc751149",
            "email": "elice2@naver.com",
            "name": "테스트유저2",
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/3957f698-a576-4a0a-bbec-082924d34c1d.PNG"
        },
        "createdAt": "2022-03-23T05:02:13.163Z",
        "updatedAt": "2022-03-23T05:02:13.163Z"
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   필수 필드가 바디에 없는 경우
    -   바디에 있는 `user_id`와 현재 로그인한 사용자의 `uuid`가 다른 경우

<br>

---

## 개별 댓글 정보 조회

<br>

### 요청

<br>

> `GET /comments/:id`

`id` 는 개별 댓글 정보의 `id`입니다.

### 응답

-   data

    ```json
    {
        "id": "f9ab2fa0-4008-41d9-82cf-65b8df8e152d",
        "content": "test...1341341432555554433332",
        "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
        "user_id": {
            "id": "7a282a61-d92a-464c-bbc4-4591dc751149",
            "email": "elice2@naver.com",
            "name": "테스트유저2",
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/3957f698-a576-4a0a-bbec-082924d34c1d.PNG"
        },
        "createdAt": "2022-03-23T05:02:13.163Z",
        "updatedAt": "2022-03-23T05:02:13.163Z"
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   댓글 정보를 찾을 수 없는 경우

<br>

---

## 댓글 정보 수정

<br>

### 요청

<br>

> `PUT /comments/:id`

`id` 는 개별 댓글 정보의 `id`입니다.

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
        | 비필수 필드 | `content` |

    ```json
    {
        "content": "content was updadated ..."
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "id": "f9ab2fa0-4008-41d9-82cf-65b8df8e152d",
        "content": "content is ...",
        "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
        "user_id": {
            "id": "7a282a61-d92a-464c-bbc4-4591dc751149",
            "email": "elice2@naver.com",
            "name": "테스트유저2",
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/3957f698-a576-4a0a-bbec-082924d34c1d.PNG"
        },
        "createdAt": "2022-03-23T05:02:13.163Z",
        "updatedAt": "2022-03-23T05:34:36.749Z"
    }
    ```

        수정 후

    ```json
    {
        "id": "f9ab2fa0-4008-41d9-82cf-65b8df8e152d",
        "content": "content was updadated ...",
        "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
        "user_id": {
            "id": "7a282a61-d92a-464c-bbc4-4591dc751149",
            "email": "elice2@naver.com",
            "name": "테스트유저2",
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/3957f698-a576-4a0a-bbec-082924d34c1d.PNG"
        },
        "createdAt": "2022-03-23T05:02:13.163Z",
        "updatedAt": "2022-03-23T05:34:36.749Z"
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   댓글 정보를 찾을 수 없는 경우
    -   댓글 정보에 기록된 작성자와 현재 로그인한 사용자가 다른 경우

<br>

---

## 사용자별 댓글 정보 목록 조회

<br>

### 요청

<br>

> `GET /commentlist/:user_id`

### 응답

-   data

    ```json
    [
        {
            "id": "34a9ace7-af57-439b-9684-c480f72b24ab",
            "content": "test...",
            "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
            "user_id": {
                "id": "20aaf676-22c7-4d9f-a76b-e05ba24bbc91",
                "email": "elice1@naver.com",
                "name": "테스트유저1",
                "profileImage": "https://kr.objectstorage.ncloud.com/team5/0ab2f831-06fd-4852-9b80-9322b401b01d.PNG"
            },
            "createdAt": "2022-03-22T16:02:16.551Z",
            "updatedAt": "2022-03-22T16:02:16.551Z"
        },
        {
            "id": "b5092641-92b0-417f-a7c8-b868f80c5541",
            "content": "test...22",
            "target_user_id": "c5f6ff51-2a31-46b7-91a5-f19e619245da",
            "user_id": {
                "id": "20aaf676-22c7-4d9f-a76b-e05ba24bbc91",
                "email": "elice1@naver.com",
                "name": "테스트유저1",
                "profileImage": "https://kr.objectstorage.ncloud.com/team5/0ab2f831-06fd-4852-9b80-9322b401b01d.PNG"
            },
            "createdAt": "2022-03-22T16:02:31.498Z",
            "updatedAt": "2022-03-22T16:02:31.498Z"
        }
    ]
    ```

-   Error

    없음

<br>

---

## 댓글 정보 삭제

<br>

### 요청

<br>

> `DELETE /comments/:id`

`id` 는 개별 댓글 정보의 `id`입니다.

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

    -   댓글 정보를 찾을 수 없는 경우
    -   댓글 정보에 기록된 작성자와 현재 로그인한 사용자가 다른 경우

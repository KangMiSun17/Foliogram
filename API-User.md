# User API

사용자의 데이터를 주고받습니다.

전부 로그인이 필요합니다. 다른 사용자의 정보는 수정할 수 없습니다.

<br>

-   [User API](#user-api)
    -   [인증](#인증)
    -   [사용자 정보 생성](#사용자-정보-생성)
        -   [요청](#요청)
        -   [응답](#응답)
    -   [개별 사용자 정보 조회](#개별-사용자-정보-조회)
        -   [요청](#요청-1)
        -   [응답](#응답-1)
    -   [사용자 정보 수정](#사용자-정보-수정)
        -   [요청](#요청-2)
        -   [응답](#응답-2)
    -   [사용자 목록 조회](#사용자-목록-조회)
        -   [요청](#요청-3)
        -   [응답](#응답-3)
    -   [사용자 정보 삭제](#사용자-정보-삭제)
        -   [요청](#요청-4)
        -   [응답](#응답-4)
    -   [현재 사용자 정보 조회](#현재-사용자-정보-조회)
        -   [요청](#요청-5)
        -   [응답](#응답-5)
    -   [현재 사용자 비밀번호 수정](#현재-사용자-비밀번호-수정)
        -   [요청](#요청-6)
        -   [응답](#응답-6)
    -   [현재 사용자 좋아요 수정](#현재-사용자-좋아요-수정)
        -   [요청](#요청-7)
        -   [응답](#응답-7)

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

## 사용자 정보 생성

<br>

### 요청

<br>

> `POST /user/register`

-   Headers

    없음

-   Body

    | <!-- -->  | <!-- -->                   |
    | --------- | -------------------------- |
    | 필수 필드 | `name`, `email`,`password` |

    | <!-- -->    | <!-- --> |
    | ----------- | -------- |
    | 비필수 필드 | 없음     |

    ```json
    {
        "name": "테스트7",
        "email": "test7@naver.com",
        "password": "test7"
    }
    ```

### 응답

-   data

    ```json
    {
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "테스트7",
        "password": "$2b$10$G.Au96P5d2R14nzdYinz8uKTZK/I.qut9ZNf.H.0w52TOJp2HEXtK",
        "description": "설명이 아직 없습니다. 추가해 주세요.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "전체",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "_id": "623c30171a3da6de7e5e92c4",
        "createdAt": "2022-03-24T08:47:19.425Z",
        "updatedAt": "2022-03-24T08:47:19.425Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   이미 email이 DB에 존재하는 경우

<br>

---

## 개별 사용자 정보 조회

<br>

### 요청

<br>

> `GET /users/:id`

`id` 는 개별 사용자 정보의 `id`입니다.

### 응답

-   data

    ```json
    {
        "_id": "623c30171a3da6de7e5e92c4",
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "정현",
        "password": "$2b$10$G.Au96P5d2R14nzdYinz8uKTZK/I.qut9ZNf.H.0w52TOJp2HEXtK",
        "description": "안녕하세요! ",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "개발자",
        "user_mvp": [
            {
                "navName": "학력",
                "state": "false"
            },
            {
                "navName": "수상이력",
                "state": false
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "createdAt": "2022-03-24T08:47:19.425Z",
        "updatedAt": "2022-03-24T09:18:03.473Z",
        "__v": 0
    }
    ```

-   Error

    해당 id가 DB에 존재하지 않는 경우

<br>

---

## 사용자 정보 수정

<br>

### 요청

<br>

> `PUT /users/:id`

`id` 는 개별 수상 정보의 `id`입니다.

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

    | <!-- -->    | <!-- -->                                                                            |
    | ----------- | ----------------------------------------------------------------------------------- |
    | 비필수 필드 | `name`, `email`,`password`,`description`,`profileImage`,`user_category`.`user_mvp`, |

    ```json
    {
        "name": "수정된 이름",
        "description": "수정된 문구입니다.",
        "user_category": "개발자",
        "user_mvp": { "navName": "학력", "state": false }
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "_id": "623c30171a3da6de7e5e92c4",
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "테스트",
        "password": "$2b$10$G.Au96P5d2R14nzdYinz8uKTZK/I.qut9ZNf.H.0w52TOJp2HEXtK",
        "description": "안녕하세요! ",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "예술",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "createdAt": "2022-03-24T08:47:19.425Z",
        "updatedAt": "2022-03-24T09:33:06.587Z",
        "__v": 0
    }
    ```

    수정 후

    ```json
    {
        "_id": "623c30171a3da6de7e5e92c4",
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "수정된 이름",
        "password": "$2b$10$G.Au96P5d2R14nzdYinz8uKTZK/I.qut9ZNf.H.0w52TOJp2HEXtK",
        "description": "수정된 문구입니다.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "개발자",
        "user_mvp": [
            {
                "navName": "학력",
                "state": false
            },
            {
                "navName": "수상이력",
                "state": false
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "createdAt": "2022-03-24T08:47:19.425Z",
        "updatedAt": "2022-03-24T09:36:37.266Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   사용자 정보를 찾을 수 없는 경우
    -   수정하려는 대상의 사용자 id와 로그인된 사용자가 다른 경우

<br>

---

## 사용자 목록 조회

<br>

### 요청

<br>

> `GET /userlist`

### 응답

-   data

    ```json
    [
        {
            "_id": "623707b181921e1f5318a59f",
            "id": "9573f5bb-fa14-48a8-8f02-60c84aec9209",
            "email": "test3@naver.com",
            "name": "테스트유저3",
            "password": "$2b$10$Zm0u6l3abgOni4ujSGxY9u6lXd0IF7/20VYhWtxOm/fjuJDGCd6I2",
            "description": "비밀번호:test3",
            "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
            "createdAt": "2022-03-20T10:53:37.569Z",
            "updatedAt": "2022-03-24T08:41:53.826Z",
            "__v": 0,
            "user_category": "전체",
            "user_mvp": [
                {
                    "navName": "학력",
                    "state": true
                },
                {
                    "navName": "수상이력",
                    "state": true
                },
                {
                    "navName": "프로젝트",
                    "state": true
                },
                {
                    "navName": "자격증",
                    "state": true
                },
                {
                    "navName": "경력",
                    "state": true
                },
                {
                    "navName": "기술스택",
                    "state": false
                }
            ]
        },
        {
            "user_category": "전체",
            "user_mvp": [
                {
                    "navName": "학력",
                    "state": true
                },
                {
                    "navName": "수상이력",
                    "state": true
                },
                {
                    "navName": "프로젝트",
                    "state": true
                },
                {
                    "navName": "자격증",
                    "state": true
                },
                {
                    "navName": "경력",
                    "state": false
                },
                {
                    "navName": "기술스택",
                    "state": false
                }
            ],
            "_id": "6237368a9349b424b35dc283",
            "id": "025e18f1-7468-4801-aba2-8c1b99308cb2",
            "email": "test@test.com",
            "name": "여건쓰의 실험실",
            "password": "$2b$10$8gqJ7gOOPWH4oTXSSPj9deX7Z3UN4C9hYcnCoS5yIgM0.tOJZUPKS",
            "description": "자세한 설명은 생략한다.",
            "createdAt": "2022-03-20T14:13:30.157Z",
            "updatedAt": "2022-03-22T15:56:36.939Z",
            "__v": 0,
            "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png"
        },
        {
            "user_category": "전체",
            "user_mvp": [
                {
                    "navName": "학력",
                    "state": true
                },
                {
                    "navName": "수상이력",
                    "state": true
                },
                {
                    "navName": "프로젝트",
                    "state": true
                },
                {
                    "navName": "자격증",
                    "state": true
                },
                {
                    "navName": "경력",
                    "state": false
                },
                {
                    "navName": "기술스택",
                    "state": false
                }
            ],
            "_id": "62383be22f83d0e26bf01826",
            "id": "38b3095c-5ff8-41b2-89ba-ae3dbe63ec6a",
            "email": "tjwjdgus@naver.com",
            "name": "정현",
            "password": "$2b$10$PeO3p5Pce467DaKr2Apa8ODWh2NHUmGtQ5kdap5IFlnX.235nXndu",
            "description": "설명이 아직 없습니다. 추가해 주세요.",
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/ea391f20-1ade-407e-b560-23492ef1549c.PNG",
            "createdAt": "2022-03-21T08:48:34.646Z",
            "updatedAt": "2022-03-21T08:51:02.463Z",
            "__v": 0
        },
        {
            "user_category": "전체",
            "user_mvp": [
                {
                    "navName": "학력",
                    "state": true
                },
                {
                    "navName": "수상이력",
                    "state": true
                },
                {
                    "navName": "프로젝트",
                    "state": true
                },
                {
                    "navName": "자격증",
                    "state": true
                },
                {
                    "navName": "경력",
                    "state": false
                },
                {
                    "navName": "기술스택",
                    "state": false
                }
            ],
            "_id": "623856983bf26b8e1462f228",
            "id": "57c7ad7d-52c8-4ce3-a8a9-9695272526b1",
            "email": "hand@gmail.com",
            "name": "test",
            "password": "test",
            "description": "설명이 아직 없습니다. 추가해 주세요.",
            "createdAt": "2022-03-21T10:42:32.292Z",
            "updatedAt": "2022-03-23T03:27:44.532Z",
            "__v": 0,
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/a37fe870-6ccb-436a-978d-9a36386404d8.PNG"
        },
        {
            "user_category": "전체",
            "user_mvp": [
                {
                    "navName": "학력",
                    "state": true
                },
                {
                    "navName": "수상이력",
                    "state": true
                },
                {
                    "navName": "프로젝트",
                    "state": true
                },
                {
                    "navName": "자격증",
                    "state": true
                },
                {
                    "navName": "경력",
                    "state": false
                },
                {
                    "navName": "기술스택",
                    "state": false
                }
            ],
            "_id": "623859960737091300084f6e",
            "id": "d9ae1a39-281a-4320-a39a-9d2c5f35fcf3",
            "email": "mm@mm.com",
            "name": "엠엠",
            "password": "$2b$10$CHbcPeVKv5BtKZP60WI1wOlYMNGvMYMr.OPtGpfa4pFB4bUyvads2",
            "description": "어렵당ㅎㅎ",
            "createdAt": "2022-03-21T10:55:18.372Z",
            "updatedAt": "2022-03-24T08:48:07.510Z",
            "__v": 0,
            "profileImage": "https://kr.objectstorage.ncloud.com/team5/7c695e41-33d3-465b-b847-319968a3e350.PNG"
        }
    ]
    ```

-   Error
    다음 상황에 에러가 발생합니다.

    -   헤더에 토큰값이 없을 경우

<br>

---

## 사용자 정보 삭제

<br>

### 요청

<br>

> `DELETE /users/:id`

`id` 는 사용자 정보의 `id`입니다.

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

    -   사용자 정보를 찾을 수 없는 경우
    -   삭제당하는 유저의 id와 삭제하는 유저의 id가 일치하지 않는 경우

<br>

---

## 현재 사용자 정보 조회

<br>

### 요청

<br>

> `GET /user/current`

`id` 는 현재 사용자 정보의 `id`입니다.

### 응답

-   data

    ```json
    {
        "_id": "623c30171a3da6de7e5e92c4",
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "정현",
        "password": "$2b$10$G.Au96P5d2R14nzdYinz8uKTZK/I.qut9ZNf.H.0w52TOJp2HEXtK",
        "description": "안녕하세요! ",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "개발자",
        "user_mvp": [
            {
                "navName": "학력",
                "state": "false"
            },
            {
                "navName": "수상이력",
                "state": false
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "createdAt": "2022-03-24T08:47:19.425Z",
        "updatedAt": "2022-03-24T09:18:03.473Z",
        "__v": 0
    }
    ```

-   Error

        해당 id가 DB에 존재하지 않는 경우

    <br>

---

## 사용자 정보 생성

<br>

### 요청

<br>

> `POST /user/login`

-   Headers

    없음

-   Body

    | <!-- -->  | <!-- -->            |
    | --------- | ------------------- |
    | 필수 필드 | `email`, `password` |

    | <!-- -->    | <!-- --> |
    | ----------- | -------- |
    | 비필수 필드 | 없음     |

    ```json
    {
        "email": "test7@naver.com",
        "password": "test7"
    }
    ```

### 응답

-   data

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWRkMWVkNzctZDcxZC00ZThiLThmZGUtNjFhZDdjZTA3Njg4IiwiaWF0IjoxNjQ4MTE1Mjc0fQ.1OUEDzJBXH-nbvHoDCEJEh_tjsdEbxuCVQKigK3k8qI",
        "id": "9dd1ed77-d71d-4e8b-8fde-61ad7ce07688",
        "email": "test7@naver.com",
        "name": "수정된 이름",
        "description": "수정된 문구입니다."
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   eamil이 DB에 존재하지 않는 경우
    -   password가 일치하지 않는 경우

<br>

---

## 현재 사용자 비밀번호 수정

<br>

### 요청

<br>

> `PUT /users/:id/password`

`id` 는 개별 사용자 정보의 `id`입니다.

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

    | <!-- -->  | <!-- -->                   |
    | --------- | -------------------------- |
    | 필수 필드 | `password`,`passwordReset` |

    | <!-- -->    | <!-- --> |
    | ----------- | -------- |
    | 비필수 필드 | 없음     |

    ```json
    {
        "password": "1234",
        "passwordReset": "test7"
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "id": "d0e452e6-1202-477c-a0ad-8fb81d0c0516",
        "email": "tjwjdgus970118@gmail.com",
        "name": "테스트7",
        "password": "$2b$10$70kvLaX3Af.OCkw8.kH8Hup55MWYOjKb2/n1t.k7oan7UDeWvxn8a",
        "active": "n",
        "description": "설명이 아직 없습니다. 추가해 주세요.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "전체",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "following": [],
        "follower": [],
        "_id": "623dce51f260dc305a4c4862",
        "createdAt": "2022-03-25T14:14:41.753Z",
        "updatedAt": "2022-03-25T14:14:41.753Z",
        "__v": 0
    }
    ```

    수정 후

    ```json
    {
        "id": "d0e452e6-1202-477c-a0ad-8fb81d0c0516",
        "email": "tjwjdgus970118@gmail.com",
        "name": "테스트7",
        "password": "$2bqwrccqwr$5wqcr.OCkw8.kqwtqwvttvq/n1t.k7ovqwrv7UDeWqwrv",
        "active": "n",
        "description": "설명이 아직 없습니다. 추가해 주세요.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "전체",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "following": [],
        "follower": [],
        "_id": "623dce51f260dc305a4c4862",
        "createdAt": "2022-03-25T14:14:41.753Z",
        "updatedAt": "2022-03-25T14:14:41.753Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   기존의 비밀번호와 다를경우
    -   수정하려는 대상의 사용자 id와 로그인된 사용자가 다른 경우

<br>

---

## 현재 사용자 좋아요 수정

<br>

### 요청

<br>

> `PUT /users/:id/likes`

`id` 는 개별 사용자 정보의 `id`입니다.

-   Headers

    ```json
    {
        "Content-Type": "application/json"
    }
    ```

-   Body

    | <!-- -->  | <!-- -->            |
    | --------- | ------------------- |
    | 필수 필드 | `following`,`state` |

    | <!-- -->    | <!-- --> |
    | ----------- | -------- |
    | 비필수 필드 | 없음     |

    ```json
    {
        "following": "fb7283cd-9c93-424c-a735-777fec16110a",
        "state": true
    }
    ```

### 응답

-   data

    수정 전

    ```json
    {
        "_id": "623dce51f260dc305a4c4862",
        "id": "d0e452e6-1202-477c-a0ad-8fb81d0c0516",
        "email": "tjwjdgus970118@gmail.com",
        "name": "테스트7",
        "password": "$2b$10$70kvLaX3Af.OCkw8.kH8Hup55MWYOjKb2/n1t.k7oan7UDeWvxn8a",
        "active": "y",
        "description": "설명이 아직 없습니다. 추가해 주세요.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "전체",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "following": [],
        "follower": [],
        "createdAt": "2022-03-25T14:14:41.753Z",
        "updatedAt": "2022-03-25T14:16:03.445Z",
        "__v": 0
    }
    ```

    수정 후

    ```json
    {
        "_id": "623dce51f260dc305a4c4862",
        "id": "d0e452e6-1202-477c-a0ad-8fb81d0c0516",
        "email": "tjwjdgus970118@gmail.com",
        "name": "테스트7",
        "password": "$2b$10$70kvLaX3Af.OCkw8.kH8Hup55MWYOjKb2/n1t.k7oan7UDeWvxn8a",
        "active": "y",
        "description": "설명이 아직 없습니다. 추가해 주세요.",
        "profileImage": "https://kr.object.ncloudstorage.com/team5/initialProfileImage.png",
        "user_category": "전체",
        "user_mvp": [
            {
                "navName": "학력",
                "state": true
            },
            {
                "navName": "수상이력",
                "state": true
            },
            {
                "navName": "프로젝트",
                "state": true
            },
            {
                "navName": "자격증",
                "state": true
            },
            {
                "navName": "경력",
                "state": false
            },
            {
                "navName": "기술스택",
                "state": false
            }
        ],
        "following": ["fb7283cd-9c93-424c-a735-777fec16110a"],
        "follower": [],
        "createdAt": "2022-03-25T14:14:41.753Z",
        "updatedAt": "2022-03-25T14:16:03.445Z",
        "__v": 0
    }
    ```

-   Error

    다음 상황에 에러가 발생합니다.

    -   수정하려는 대상의 사용자 id와 로그인된 사용자가 다른 경우
    -   현재 로그인된 사용자가 또는 following하려는 사용자가 이미 회원탈퇴를 한경우
    -   state가 true,또는 false값이 아닐경우
    -   이미 좋아요를 했는데 좋아요요청을 보냈을경우
    -   이미 좋아요를 안했는데 좋아요안함 요청을 보냈을 경우

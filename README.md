# PET DIARY
사적인 일기를 쓰거나, 커뮤니티 글을 게시할 수 있는 웹사이트입니다. 회원가입 기능을 추가해 회원만 글을 작성할 수 있습니다. 

#### 나만 볼 수 있는 일기 쓰기
다이어리 탭에서는 사진을 찍고 일기를 쓸 수 있습니다. 사소한 것도 작성해보세요.

#### 유저들과 소통하기
커뮤니티 탭에서는 자유롭게 글을 게시할 수 있습니다.
댓글로 느낀점을 공유할 수 있습니다. 

![main3](https://user-images.githubusercontent.com/94767408/185787498-3bcef839-5a51-4eb0-a3ca-6dae0d6eacb5.gif)


## Technologies
- React.js, Next.js, SCSS
- Redux, Redux Toolkit
- DB: MongoDB, Cloudinary

## What did I do
- Next.js의 Api routes를 이용한 API개발
- Redux, Redux toolkit을 이용한 상태관리
- DB(MongoDB, Cloudinary)에 사진과 텍스트 데이터 관리
- SSR, CSR를 적절히 활용한 렌더링
- 회원가입, 로그인, 로그아웃
- Figma툴을 이용한 기획 및 디자인, 개발

## How to use
### 0. 기능
![0-main-pages](https://user-images.githubusercontent.com/94767408/185787892-9dbfcecd-ead5-41bd-905b-67cd3c83bc25.jpg)
**하단 메뉴바를 클릭해서 탭을 변경할 수 있습니다.**
- 커뮤니티 탭: 글을 쓰고 댓글을 달며 유저들과 소통합니다.
- 다이어리 탭: 본인만 볼 수 있는 일기를 작성합니다.
- 설정 탭: 계정 관리를 할 수 있습니다.

### 1. 회원가입 / 로그인
![1-account](https://user-images.githubusercontent.com/94767408/185787896-fd9b9190-09a8-4901-9e7a-d16bb184f5a1.jpg)
- 첫 페이지에서는 시작하기 버튼을 눌러 진행합니다.
- 로그인 되어 있는 경우 시작하기 버튼을 누르면 자동으로 메인페이지로 이동합니다. 
- 예외상황에 모달창을 띄워 에러를 방지합니다. 
너무 짧은 경우, 한글이 포함된 경우, 이미 아이디가 존재할 경우 등

### 2. 다이어리 탭
![2-diary](https://user-images.githubusercontent.com/94767408/185787901-e271102e-dfd8-4125-9e77-9306a0526c78.jpeg)
- 작성한 글을 수정하거나 삭제할 수 있습니다.
- 일기를 작성하지 않았다면 귀여운 일러스트가 나옵니다.
- 일기가 여러개라면 '더보기'버튼을 눌러 렌더링할 수 있습니다.

### 3. 커뮤니티 탭
![3-community](https://user-images.githubusercontent.com/94767408/185787907-88161561-dc2d-4582-b38f-1c0f8ab6eaf3.jpeg)
- 작성한 글을 수정하거나 삭제할 수 있습니다.
- 댓글을 작성하거나 삭제할 수 있습니다.
- 글을 작성한 시간이 표시됩니다.
- '더보기'버튼을 눌러 이전 글을 렌더링할 수 있습니다.

### 4. 설정 탭
![4-settings](https://user-images.githubusercontent.com/94767408/185787912-95e4bd02-8cf9-4bbb-9d2b-58e6f94229d4.jpeg)
- 본인의 아이디를 확인할 수 있습니다.
- 비밀번호를 변경할 수 있습니다.
- 기존 비밀번호를 입력해 회원 탈퇴를 할 수 있습니다.

### 5. 모달 창
![5-modal](https://user-images.githubusercontent.com/94767408/185787925-b83ab127-c9a3-4f0a-94fc-79c809ef8732.jpeg)
상황에 따라 적절한 모달창을 렌더링합니다.
- 삭제와 같은 영향력이 큰 기능은 실행 전 다시 한 번 묻습니다.
- 작업을 수행할 때는 로딩창을 띄워 실행 중임을 알려줍니다.
- 작업을 완수했다면 완료창을 띄우고 실패했다면 실패창을 띄웁니다. 

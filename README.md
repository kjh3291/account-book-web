# 달력형 가계부 - 수정/카테고리 관리 버전

## 추가 반영 내용
- 입력한 일반 내역 수정 가능
- 삭제 버튼 왼쪽에 수정 버튼 추가
- 카테고리 기본 예시 제거
- 카테고리는 사용자가 직접 생성
- + 만들기 버튼으로 카테고리 관리 팝업 열기
- 카테고리 관리 팝업 안에서 + 카테고리 추가 가능
- 만든 카테고리는 삭제하기 전까지 계속 유지
- 카테고리가 5개를 넘으면 더보기 버튼으로 확장
- 사용 중인 카테고리는 통계 보존을 위해 삭제 제한
- 반복 설정에서도 같은 카테고리 관리 구조 사용

## 실행 방법
VS Code에서 폴더를 열고 index.html을 Live Server로 실행하세요.


## 이번 수정
- 카테고리 더보기 버튼을 누르면 스크롤 가능한 카테고리 선택 팝업이 열립니다.
- 반복 설정에서 + 만들기 버튼을 눌렀을 때 카테고리 관리 팝업이 보이지 않던 문제를 수정했습니다.
- 잔액 예산 나누기 항목에도 수정 버튼을 추가했습니다.
- 예산 수정 시 기존 금액을 제외하고 사용 가능 잔액을 다시 계산하도록 처리했습니다.


## 오류 수정 및 구조 정리
- 달력 날짜가 표시되지 않던 JavaScript 오류 수정
- 하단 바 제거
- 사용 가능 잔액 카드 클릭 시 월별 예산 목표 페이지로 이동
- 월별 예산 목표에서 만든 카테고리는 지출 카테고리에 자동 추가
- Firebase 연결 전 단계로 localStorage 기반 안정화


## Firebase 동기화 추가 버전

이번 버전에는 Firebase Google 로그인과 Firestore 저장 기능이 추가되었습니다.

### 사용 전 Firebase 콘솔에서 확인할 것

1. Authentication → Sign-in method → Google 사용 설정
2. Firestore Database 생성 완료
3. Firestore 규칙을 개발용으로 아래처럼 설정

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 동작 방식

- 로그인 전: 브라우저 localStorage에 저장
- Google 로그인 후: Firestore `users/{uid}` 문서에 저장
- 다른 기기에서 같은 Google 계정으로 로그인하면 같은 데이터가 불러와짐

### 주의

Live Server로 실행해야 Firebase module import가 안정적으로 작동합니다.


## 오류 수정
- Firebase 로그인 이벤트가 반복 설정 함수 내부에 들어가 있던 문제를 수정했습니다.
- 로그인/로그아웃 이벤트와 로그인 상태 감지는 앱 시작 시 바로 실행되도록 위치를 수정했습니다.


## UI 최종 정리
- 로그인 후 “동기화 완료” 문구 대신 간단히 “로그인됨”만 표시
- 로그아웃 버튼을 상단에서 제거하고 설정 팝업 안으로 이동
- 설정 안에 다크 모드 추가
- 설정 안에 5가지 테마 색상 추가
- 선택한 다크 모드/테마는 localStorage에 저장되어 새로고침 후에도 유지


## UI 설정 분리 수정
- 반복 설정 안에 있던 앱 설정을 제거했습니다.
- 상단에 별도 `설정` 버튼을 추가했습니다.
- 설정 팝업 안에 로그아웃, 다크 모드, 테마 색상 선택을 배치했습니다.
- 다크 모드를 완전 검정이 아니라 눈이 덜 피로한 다크 그레이 톤으로 조정했습니다.
- 테마 색상을 강한 색이 아니라 웜/세이지/스카이/라벤더/샌드 계열의 부드러운 색상으로 변경했습니다.


## PWA 추가 버전

이번 버전에는 앱처럼 설치하기 위한 PWA 파일이 추가되었습니다.

### 추가된 파일
- `manifest.json`: 앱 이름, 아이콘, 시작 URL, 테마 색상 설정
- `service-worker.js`: 앱 기본 파일 캐싱
- `icons/icon-192.png`
- `icons/icon-512.png`

### 실행
VS Code에서 Live Server로 실행하세요.

### 확인 방법
Chrome 개발자도구 → Application 탭 → Manifest / Service Workers에서 확인할 수 있습니다.

### 주의
PWA 설치 기능은 일반적으로 HTTPS 환경에서 안정적으로 작동합니다.
따라서 다음 단계에서 Firebase Hosting으로 배포해야 휴대폰에서 앱처럼 설치하기 쉽습니다.

# 달력형 가계부

수입, 지출, 반복 수입/고정 지출, 월별 예산 목표, 카테고리 통계, 테마 설정, Firebase 동기화를 지원하는 달력형 가계부 웹앱입니다.

## 주요 기능

- 달력 기반 수입/지출 기록
- 날짜별 내역 추가, 수정, 삭제
- 반복 수입 및 고정 지출 설정
- 카테고리 직접 생성 및 관리
- 카테고리별 월별 통계 확인
- 월별 예산 목표 설정
- 사용 가능 잔액 확인
- Google 로그인 기반 Firebase Firestore 동기화
- PWA 설치 지원
- 다크 모드 및 5가지 테마 색상 지원

## 파일 구조

```text
account-book-pwa-ready/
├── index.html
├── style.css
├── script.js
├── manifest.json
├── service-worker.js
├── firebase.json
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## 실행 방법

VS Code에서 Live Server로 `index.html`을 실행합니다.

```text
index.html 우클릭 → Open with Live Server
```

## Firebase 설정

`script.js` 상단의 `firebaseConfig`에는 현재 프로젝트 설정값이 들어 있습니다. 다른 Firebase 프로젝트를 사용할 경우 Firebase Console에서 웹앱 설정값을 복사해 교체하세요.

Firestore 보안 규칙 예시:

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

## Firebase Hosting 배포

Firebase CLI 설치 후 아래 명령어를 사용합니다.

```bash
firebase login
firebase init hosting
firebase deploy
```

`firebase init hosting`에서 public directory는 `.`으로 설정합니다.

## PWA 설치

배포 후 HTTPS 주소에서 접속하면 모바일 브라우저에서 홈 화면에 추가하여 앱처럼 사용할 수 있습니다.

## Android APK 관련 참고

이 저장소는 현재 웹/PWA 기준으로 정리되어 있습니다. Android Capacitor 프로젝트까지 GitHub에 올릴 경우 아래 파일은 보안 및 환경 의존성 때문에 제외하는 것을 권장합니다.

```text
android/local.properties
android/app/google-services.json
android/app/build/
android/.gradle/
node_modules/
```

Android 앱을 다시 빌드할 때는 각자 Firebase Console에서 `google-services.json`을 다시 받아 `android/app/google-services.json`에 넣어야 합니다.

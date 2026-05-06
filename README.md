# Calendar Account Book (달력형 가계부)

달력 기반으로 수입/지출을 관리하고, 카테고리별 예산과 반복 지출까지 함께 관리할 수 있는 PWA 가계부입니다.  
웹 브라우저와 Android 앱 형태로 모두 사용할 수 있습니다.

---

# 주요 기능

## 기본 가계부 기능
- 달력 기반 수입 / 지출 관리
- 내역 추가 / 수정 / 삭제
- 메모 작성 가능
- 카테고리별 지출 관리
- 반복 지출 자동 등록

## 예산 관리
- 카테고리별 월 예산 설정
- 예산 사용량 자동 계산
- 남은 예산 실시간 표시
- 사용 가능 잔액 자동 계산

## 카테고리 관리
- 사용자 직접 카테고리 생성
- 카테고리 수정 및 삭제
- 많이 생성될 경우 “더보기” 지원
- 월별 예산 카테고리 자동 연동

## 설정 기능
- 다크 모드 지원
- 테마 색상 변경
- 설정값 자동 저장(localStorage)

## Firebase 연동
- Google 로그인
- Firestore 데이터 저장
- 여러 기기 간 데이터 동기화

## PWA 지원
- 앱처럼 설치 가능
- 홈 화면 추가 지원
- 기본 오프라인 캐싱 지원

---

# 실행 방법

## 웹 실행

VS Code에서 프로젝트 폴더를 연 뒤 Live Server로 실행합니다.

```bash
index.html → Open with Live Server
```

---

# Firebase 설정

Firebase 기능을 사용하려면 아래 설정이 필요합니다.

## 1. Authentication 설정
Firebase Console → Authentication → Sign-in method

```text
Google 로그인 활성화
```

## 2. Firestore 생성
Firebase Console → Firestore Database 생성

## 3. Firestore Rules 설정

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null
      && request.auth.uid == userId;
    }
  }
}
```

---

# 데이터 저장 방식

## 로그인 전
```text
localStorage 저장
```

## 로그인 후
```text
Firestore 동기화 저장
```

같은 Google 계정으로 로그인하면 다른 기기에서도 동일한 데이터를 사용할 수 있습니다.

---

# Android 실행

Capacitor 기반 Android 앱 실행:

```bash
npx cap sync android
npx cap open android
```

Android Studio 실행 후:

```bash
Run ▶ app
```

---

# PWA 구성 파일

```text
manifest.json
service-worker.js
icons/icon-192.png
icons/icon-512.png
```

---

# 사용 기술

## Frontend
- HTML
- CSS
- JavaScript

## Backend / Cloud
- Firebase Authentication
- Firestore

## Mobile
- Capacitor
- Android Studio

---

# 프로젝트 구조

```text
index.html
style.css
script.js
manifest.json
service-worker.js
icons/
android/
```

---

# 주의 사항

- Firebase 기능 사용 시 인터넷 연결 필요
- PWA 설치는 HTTPS 환경에서 권장
- Android 빌드 시 Java/JDK 및 Android Studio 필요

---

# 최근 수정 사항

- 일반 내역 수정 기능 추가
- 예산 수정 시 잔액 재계산 개선
- 사용 가능 잔액 계산 방식 수정
- 카테고리 관리 UI 개선
- 설정 메뉴 분리
- Firebase 로그인 구조 안정화
- Android 연동 구조 정리
- 모바일 UI 최적화

---

# 라이선스

개인 학습 및 프로젝트 용도로 제작되었습니다.

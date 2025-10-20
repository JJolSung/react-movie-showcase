## CineMix: React 영화 브라우저

간단하고 빠른 영화 탐색 웹앱입니다. YTS 공개 API(`https://yts.mx`)를 사용해 평점 높은 영화들을 불러오고, 검색/정렬/장르 필터링, 상세 보기, 트레일러, 토렌트 링크 등을 제공합니다. 다크 테마와 반응형 레이아웃, 로딩 스켈레톤 UI를 제공합니다.

---

### 주요 기능

- **영화 목록**: YTS API에서 평점 8.0 이상, 최대 48편 조회
- **검색/필터**:
  - **제목 검색**
  - **정렬**: 연도, 평점, 다운로드 수, 좋아요 수, 제목
  - **장르 필터**: 목록에서 자동 생성된 장르 선택
- **상세 보기**: 포스터, 연도, 평점, 상영시간, 장르, 줄거리
- **트레일러/다운로드**: 유튜브 트레일러 임베드, 토렌트(품질/타입/용량) 링크 제공
- **접근성/성능**: 이미지 `loading="lazy"`, ARIA 라벨, 요청 취소(AbortController), 로딩 스켈레톤

---

### 기술 스택

- **React 19**
- **React Router DOM 7** (라우팅)
- **Create React App (react-scripts 5)**
- 순수 **CSS** 스타일(`src/styles.css`)

---

### 라우팅

- **`/`**: 홈(목록/검색/정렬/필터)
- **`/movie/:id`**: 상세 페이지

---

### 빠른 시작

사전 요구 사항: Node.js 18+ 권장, npm 또는 pnpm 사용 가능

```bash
# 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm start

# 프로덕션 빌드 생성 (build 폴더)
npm run build

# 테스트 실행 (watch 모드)
npm test
```

CRA 기본 스크립트를 그대로 사용합니다.

- `npm start`: 개발 서버 실행
- `npm test`: 테스트 러너 실행
- `npm run build`: 프로덕션 빌드
- `npm run eject`: 구성 추출(되돌릴 수 없음)

---

### 폴더 구조(요약)

```text
src/
  App.js            # 라우터/레이아웃 헤더
  index.js          # 엔트리, 전역 스타일 로드
  styles.css        # 다크 테마, 레이아웃, 컴포넌트 스타일
  components/
    Movie.js        # 영화 카드(상세 버튼/찜 버튼 UI)
  routes/
    Home.js         # 목록/검색/정렬/장르 필터 + 스켈레톤
    Detail.js       # 상세(포스터, 메타, 장르칩, 트레일러, 토렌트)
```

---

### 외부 API

- 목록: `GET https://yts.mx/api/v2/list_movies.json`
  - 사용 파라미터: `minimum_rating`, `limit`, `sort_by`, `order_by`, `with_rt_ratings`
- 상세: `GET https://yts.mx/api/v2/movie_details.json`
  - 사용 파라미터: `movie_id`, `with_images`, `with_cast`

네트워크 에러 또는 API 스키마 변경 시 일부 기능이 제한될 수 있습니다.

---

### 배포 (GitHub Pages, 선택)

`gh-pages` 패키지가 포함되어 있습니다. GitHub Pages로 배포하려면 아래 설정을 완료하세요.

1. `package.json`의 `homepage`를 저장소 주소로 설정

```json
{
  "homepage": "https://<GitHub_사용자명>.github.io/<저장소명>"
}
```

2. 배포 스크립트 추가

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. 배포 실행

```bash
npm run deploy
```

---

### 크레딧

- 데이터: YTS API (`https://yts.mx`)
- 템플릿: Create React App

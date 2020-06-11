## Code on Board


## I. 프로젝트 소개


![캡처](https://user-images.githubusercontent.com/17774917/83146930-ed9a4000-a131-11ea-9035-8ee1bd74d214.JPG)


팀페이지주소 : https://kookmin-sw.github.io/capstone-2020-16/


**알고리즘 보드게임 플랫폼 코드 온 보드(Code on board)**


본 프로젝트는 일정수준의 코딩이 가능하고 기본적인 알고리즘이 숙지된 사람들을 대상으로 한다.
8x8 보드판에서 게임에 대한 알고리즘 대전을 제공하는 웹사이트를 개발하는 것이 목표다.
사용자는 본 서비스를 통해 작성한 코드로 사람들과의 대전을 하고 점수 경쟁을 통해 알고리즘 트레이닝을 지속할 수 있는 동기를 얻을 수 있다.
또한 리플레이 기능과 내 코드와의 대전을 통해 자신의 코드를 리뷰할 수 있는 기회를 시각적으로 얻을 수 있다.

  
  
**Algorithm Board Game Platform Code On Board**

The goal of this project is to develop a web service that provides algorithm warfare for games on 8x8 board to people who can code at a certain level and have studied basic algorithms.
With codes written through this service, users can have an incentive to compete against people and to continue algorithm training through score competitions, and to review their codes visually through replays and battle with my codes.




## II. 소개영상 및 중간 시행영상

소개 영상

[![Video Label](http://img.youtube.com/vi/onwGQSGU9kc/0.jpg)](https://www.youtube.com/watch?v=onwGQSGU9kc&feature=youtu.be)


중간 시행영상

[![Video Label](http://img.youtube.com/vi/0Gv2LHSX710/0.jpg)](https://www.youtube.com/watch?v=0Gv2LHSX710&feature=youtu.be)


최종 시행영상

[![Video Label](http://img.youtube.com/vi/HUIAYqjYGPI/0.jpg)](https://www.youtube.com/watch?v=HUIAYqjYGPI&feature=youtu.be) 

## III. 팀 소개

![CJS](https://user-images.githubusercontent.com/17774917/77532770-ea3bcb80-6ed8-11ea-84f3-f43deccd5432.JPG)

### 최준수 교수님

📧 **E-Mail** : jschoi@kookmin.ac.kr

📌 **Role**   : 지도교수

<br/><br/>
<br/><br/>
![CMS](https://user-images.githubusercontent.com/17774917/77533673-a8ac2000-6eda-11ea-8002-33fac8a50e5a.JPG)

### 최명서

👨‍💻 **Student ID**    : 20143107

📧 **E-Mail** : tyms0503@kookmin.ac.kr

📌 **Role**   : 프로젝트 팀장, Core로직 구현, DB설계, Docker Container 구현


<br/><br/>
<br/><br/>
![CJW](https://user-images.githubusercontent.com/17774917/77534006-44d62700-6edb-11ea-8e9b-9e3a26521161.png)

### 최지욱

👨‍💻 **Student ID**    : 20143109

📧 **E-Mail** : boo106@kookmin.ac.kr

📌 **Role**   : Front-End 개발, 리플레이 UI/UX 구현


<br/><br/>
<br/><br/>
![baco](https://user-images.githubusercontent.com/17774917/77658505-2430ce80-6fba-11ea-9edd-5469ba88a299.jpg)

### 박호준

👨‍💻 **Student ID**    : 20153183

📧 **E-Mail** : mara8534@kookmin.ac.kr

📌 **Role**   : Front-End 개발, Docker Container구현


<br/><br/>
<br/><br/>
![WHW](https://user-images.githubusercontent.com/17774917/77534210-95e61b00-6edb-11ea-9cbc-736274139e3a.jpg)

### 우현웅

👨‍💻 **Student ID**    : 20153195

📧 **E-Mail** : dngusdnd@kookmin.ac.kr

📌 **Role**   : API개발, DB 설계 및 구현, Front-End 개발


<br/><br/>
<br/><br/>
![KSR](https://user-images.githubusercontent.com/17774917/77534252-a4cccd80-6edb-11ea-8460-0364b64a4a94.png)

### 강수련

👩‍💻 **Student ID**    : 20162736

📧 **E-Mail** : srkang0913@kookmin.ac.kr

📌 **Role**   : Front-End 개발, UI/UX 디자인


<br/><br/>
<br/><br/>
![KRD](https://user-images.githubusercontent.com/17774917/77534337-ce85f480-6edb-11ea-9ce9-bfeb89ccbad5.jpg)

### 칼리드

👨‍💻 **Student ID**    : 20163173

📧 **E-Mail** : woo-4@hotmail.com

📌 **Role**   : Front-End 개발

<br/><br/>
<br/><br/>
## IV. 사용법

### API 서버
```
  1. pip install requirements.txt 를 사용하여 필요한 모듈을 설치한다.
  2. capstone-2020-16/api 위치에서 다음 명령어를 실행한다.
  3. python3.6 manage.py runserver 0.0.0.0:port
  4. 설정한 포트로 API서버를 배포할 수 있다.
```

### Core 서버
```
  1. Docker, Celery와 redis를 설치한다.
  2. capstone-2020-16/core 디렉토리에서 sudo docker build -t core . 명령어를 통해 docker imgae를 생성한다.
  3. 터미널 창에서 redis-server를 통해 redis를 켠다
  4. capstone-2020-16/core 디렉토리에서 Celery -A tasks worker –loglevel=info 명령어를 통해 Celery를 실행한다.
```

### 클라이언트 서버
* Installation
```
  # clone the repo
  $ git clone https://github.com/kookmin-sw/capstone-2020-16.git
  
  # go to app's directory
  $ cd capstone-2020-16/front/
  
  # install app's dependencies
  $ yarn install
```
      
* Create React App
```
  # dev server with hot reload at http://localhost:3000
  $ yarn start
```


* Build
```
  # build for production with minification
  $ yarn build
```

* 사용자 메뉴얼

  __Click__ ===>
  [manual](https://github.com/kookmin-sw/capstone-2020-16/blob/master/docs/%EC%82%AC%EC%9A%A9%EC%9E%90%20%EB%A9%94%EB%89%B4%EC%96%BC.pdf)


## V. 기타

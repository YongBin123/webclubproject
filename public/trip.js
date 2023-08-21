function memo() {
  location.href = "memo.html";
}
  
function quiz() {
  location.href = "quiz.html";
}
  
function packing() {
  location.href = "packing.html";
}
  
function plan() {
  location.href = "plan.html";
}
  
function review() {
  location.href = "review.html";
}

function community() {
  location.href = "community.html";
}

function guide() {
  location.href = "guide.html";
}

function displayMainInfo() {
  location.href = "trip.html";
}

function displayAmusementParkInfo() {
  const amusementParkPhotos = [
    {
      imageSrc: 'images/everland.jpg',
      title: '에버랜드',
      description: '경기 용인시 처인구 포곡읍 에버랜드로 199',
      website: 'https://www.everland.com/web/everland/main.html'
    },
    {
      imageSrc: 'images/lotte.jpeg',
      title: '롯데월드 어드벤처',
      description: '서울 송파구 올림픽로 240',
      website: 'https://www.lotteworld.com/gate.html'
    },
    {
      imageSrc: 'images/lottebusan.jpeg',
      title: '롯데월드 어드벤처 부산',
      description: '부산 기장군 기장읍 동부산관광로 42',
      website: 'https://adventurebusan.lotteworld.com/kor/main/index.do'
    },
    {
      imageSrc: 'images/oworld.jpeg',
      title: '대전오월드',
      description: '대전 중구 사정공원로 70',
      website: 'https://www.oworld.kr/newkfsweb/kfs/dcco/dccoMainindex.do'
    },
    {
      imageSrc: 'images/e.webp',
      title: '이월드',
      description: '대구 달서구 두류공원로 200 이월드',
      website: 'https://eworld.kr/'
    },
    {
      imageSrc: 'images/family.jpeg',
      title: '광주패밀리랜드',
      description: '광주 북구 우치로 677 광주패밀리랜드',
      website: 'http://gjfamilyland.com/'
    },
    {
      imageSrc: 'images/seouland.webp',
      title: '서울랜드',
      description: '경기 과천시 광명로 181',
      website: 'https://seoulland.co.kr/'
    },  
    {
      imageSrc: 'images/gyeongju.jpeg',
      title: '경주월드',
      description: '경북 경주시 보문로 544',
      website: 'https://www.gjw.co.kr/'
    },      
    {
      imageSrc: 'images/child.jpeg',
      title: '서울어린이대공원',
      description: '서울 광진구 능동로 216',
      website: 'https://www.sisul.or.kr/open_content/childrenpark/'
    },    
    {
      imageSrc: 'images/seouldae.jpeg',
      title: '서울대공원',
      description: '경기 과천시 대공원광장로 102',
      website: 'https://grandpark.seoul.go.kr/main/ko.do'
    },    
    {
      imageSrc: 'images/wungjin.jpeg',
      title: '웅진플레이도시',
      description: '경기 부천시 조마루로 2',
      website: 'http://www.playdoci.com/'
    },
    {
      imageSrc: 'images/farm.jpeg',
      title: '안성팜랜드',
      description: '경기 안성시 공도읍 대신두길 28',
      website: 'http://nhasfarmland.com/asfarm.php?device='
    },    
    {
      imageSrc: 'images/blue.jpeg',
      title: '해운대블루라인파크',
      description: '부산 해운대구 청사포로 116 청사포정거장',
      website: 'https://www.bluelinepark.com/'
    },    
    {
      imageSrc: 'images/rugi.png',
      title: '여수 유월드 루지 테마파크',
      description: '전남 여수시 소라면 안심산길 155',
      website: 'https://home-ticket.co.kr/uworld/'
    },
    {
      imageSrc: 'images/hasla.jpeg',
      title: '하슬라아트월드',
      description: '강원 강릉시 강동면 율곡로 1441',
      website: 'https://www.museumhaslla.com/'
    },    
    {
      imageSrc: 'images/ecoland.jpeg',
      title: '에코랜드테마파크',
      description: '제주 제주시 조천읍 번영로 1278-169',
      website: 'https://www.ecolandjeju.co.kr/'
    }   
    ];

    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = ''; // 기존 내용을 초기화

    for (const photoInfo of amusementParkPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayHistoryInfo() {
  const historyPhotos = [
    {
      imageSrc: 'images/gung.jpg',
      title: '경복궁',
      description: '서울 종로구 사직로 161 경복궁',
      website: 'https://www.royalpalace.go.kr/'
    },
    {
      imageSrc: 'images/changdeok.jpeg',
      title: '창덕궁',
      description: '서울 종로구 율곡로 99',
      website: 'https://www.cdg.go.kr/default.jsp'
    },
    {
      imageSrc: 'images/deoksu.jpeg',
      title: '덕수궁',
      description: '서울 중구 세종대로 99 덕수궁',
      website: 'https://www.deoksugung.go.kr/'
    },
    {
      imageSrc: 'images/baekje.jpeg',
      title: '백제문화단지',
      description: '충남 부여군 규암면 백제문로 455 백제문화단지',
      website: 'https://www.bhm.or.kr/html/kr/'
    },
    {
      imageSrc: 'images/chumgsung.jpeg',
      title: '첨성대',
      description: '경북 경주시 인왕동 839-1',
    },
    {
      imageSrc: 'images/buseok.jpeg',
      title: '부석사',
      description: '경북 영주시 부석면 부석사로 345',
      website: 'http://www.pusoksa.org/main'
    },
    {
      imageSrc: 'images/seokgul.webp',
      title: '석굴암',
      description: '경북 경주시 석굴로 238',
      website: 'http://seokguram.org/'
    },  
    {
      imageSrc: 'images/bulguk.jpeg',
      title: '불국사',
      description: '경북 경주시 보문로 544',
      website: 'https://www.gjw.co.kr/'
    },      
    {
      imageSrc: 'images/town5.jpeg',
      title: '안동하회마을',
      description: '경북 안동시 풍천면 전서로 186',
      website: 'http://www.hahoe.or.kr/coding/main.asp'
    },    
    {
      imageSrc: 'images/nakan.jpeg',
      title: '낙안읍성',
      description: '전남 순천시 낙안면 평촌리 6-4',
      website: 'https://www.suncheon.go.kr/nagan/'
    },    
    {
      imageSrc: 'images/gwanghan.jpg',
      title: '광한루원',
      description: '전북 남원시 요천로 1447',
      website: 'https://www.namwon.go.kr/tour/index.do?menuCd=DOM_000001001007001000'
    },
    {
      imageSrc: 'images/manjang.jpeg',
      title: '만장굴',
      description: '제주 제주시 구좌읍 만장굴길 182',
    }
    ];

  const photoContainer = document.querySelector('.photo-container');
  photoContainer.innerHTML = ''; // 기존 내용을 초기화

  for (const photoInfo of historyPhotos) {
    const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
    photoContainer.appendChild(photoDiv);
  }
}

function displayAnimalPlantInfo() {
  const amusementParkPhotos = [
    {
      imageSrc: 'images/nature.jpeg',
      title: '네이처파크',
      description: '대구 달성군 가창면 가창로 891',
      website: 'http://www.spavalley.co.kr/naturepark/'
    },
    {
      imageSrc: 'images/animal.jpeg',
      title: '전주동물원',
      description: '전북 전주시 덕진구 소리로 68 전주동물원',
      website: 'https://zoo.jeonju.go.kr/'
    },
    {
      imageSrc: 'images/bugyeong.jpeg',
      title: '부경동물원',
      description: '경남 김해시 유하로226번길 70',
      website: 'https://adventurebusan.lotteworld.com/kor/main/index.do'
    },
    {
      imageSrc: 'images/seoulplant.jpeg',
      title: '서울식물원',
      description: '서울 강서구 마곡동로 161 서울식물원',
      website: 'https://botanicpark.seoul.go.kr/front/main.do'
    },
    {
      imageSrc: 'images/hwadam.jpeg',
      title: '화담숲',
      description: '경기 광주시 도척면 도척윗로 278-1',
      website: 'https://www.hwadamsup.com/renewal/pc/ko/index.do'
    },
    {
      imageSrc: 'images/goyo.jpeg',
      title: '아침고요수목원',
      description: '경기 가평군 상면 수목원로 432',
      website: 'https://www.morningcalm.co.kr/html/main.php'
    },
    {
      imageSrc: 'images/hanbat.jpeg',
      title: '한밭수목원',
      description: '대전 서구 둔산대로 169',
      website: 'https://www.daejeon.go.kr/gar/index.do'
    },  
    {
      imageSrc: 'images/cheonli.jpeg',
      title: '천리포수목원',
      description: '충남 태안군 소원면 천리포1길 187 천리포수목원',
      website: 'https://www.chollipo.org/'
    },      
    {
      imageSrc: 'images/jade.jpeg',
      title: '제이드가든',
      description: '강원 춘천시 남산면 햇골길 80',
      website: 'https://www.instagram.com/jadegardenkorea/'
    },    
    {
      imageSrc: 'images/hill.jpeg',
      title: '카멜리아힐',
      description: '제주 서귀포시 안덕면 병악로 166',
      website: 'https://www.camelliahill.co.kr/'
    },    
    {
      imageSrc: 'images/sejong.jpeg',
      title: '국립세종수목원',
      description: '세종 수목원로 136',
      website: 'https://www.sjna.or.kr/main/main.do'
    },
    {
      imageSrc: 'images/bear.jpg',
      title: '베어트리파크',
      description: '세종 전동면 신송로 217',
      website: 'http://beartreepark.com/'
    }   
    ];

    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = ''; // 기존 내용을 초기화

    for (const photoInfo of amusementParkPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}


function createPhotoDiv(imageSrc, title, description, website) {
  const photoDiv = document.createElement('div');
  photoDiv.classList.add('photo');

  const photoLink = document.createElement('a');
  photoLink.href = website; // 해당 사진의 홈페이지로 링크 설정
  photoLink.innerHTML = `<img src="${imageSrc}" alt="Photo" class="photo">`;
  photoDiv.appendChild(photoLink);

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.innerHTML = `${title}<br><br>${description}`;
  photoDiv.appendChild(descriptionParagraph);

  return photoDiv;
}
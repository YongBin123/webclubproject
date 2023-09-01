document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewList = document.getElementById('reviewList');
  let selectedRating = 0;

  // 서버에서 리뷰 목록을 가져옴 (로컬 스토리지와 동기화)
  loadReviewsFromServer();
  loadReviewsFromLocalStorage();

  const starsContainers = document.querySelectorAll('.star-rating');
  starsContainers.forEach((container, index) => {
  const stars = container.querySelectorAll('.star');
  stars.forEach((star, starIndex) => {
    star.addEventListener('click', () => {
      selectedRating = starIndex + 1;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < selectedRating);
      });
    });
  });
});

reviewList.addEventListener('click', function(event) {
  const target = event.target;
  
  if (target.classList.contains('like-btn')) {
    const parentLi = target.closest('li');
    const reviewId = parentLi.getAttribute('data-review-id');
    
    if (reviewId) {
      const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const updatedReviews = savedReviews.map(review => {
        if (review.id === parseInt(reviewId)) {
          review.liked = !review.liked;
          return review;
        }
        return review;
      });
      
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      updateLikeStatus(target, reviewId);
    }
  }
});

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const placeInput = document.getElementById('place');
    const reviewInput = document.getElementById('review');
    const place = placeInput.value;
    const review = reviewInput.value;

    if (place === '' || review === '' || selectedRating === 0) {
      return;
    }

    const formData = {
      id: Date.now(), // 간단히 현재 시간을 사용하여 고유한 ID를 생성
      place: place,
      review: review,
      rating: selectedRating,
    };

    createReviewElement(formData);
    saveReviewToServer(formData);
    saveReviewToLocalStorage(formData);
    resetForm();
  });
});

function loadReviewsFromServer() {
  fetch('/getReviews', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('reviews', JSON.stringify(data));

      data.forEach(reviewData => {
        createReviewElement(reviewData);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function loadReviewsFromLocalStorage() {
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  savedReviews.forEach(reviewData => {
    createReviewElement(reviewData);
  });
}

function createReviewElement(formData) {
  const li = document.createElement('li');

  const reviewInfo = document.createElement('span');
  reviewInfo.textContent = formData.place + ': ' + formData.review;
  li.appendChild(reviewInfo);

  
  const ratingContainer = document.createElement('div');
  ratingContainer.classList.add('star-rating');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = '★';

    if (i <= formData.rating) {
      star.classList.add('active');
    }

    ratingContainer.appendChild(star);
  }
  li.appendChild(ratingContainer);

  reviewList.appendChild(li);

  const editDeleteContainer = document.createElement('div'); // 수정 버튼과 삭제 버튼을 감싸는 컨테이너
  editDeleteContainer.classList.add('edit-delete-container');

  const editBtn = document.createElement('span');
  editBtn.classList.add('edit-btn');
  editBtn.textContent = '수정';
  editBtn.addEventListener('click', function() {
    editReview(formData);
  });
  editDeleteContainer.appendChild(editBtn);

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '삭제';
  deleteBtn.addEventListener('click', function () {
    const reviewId = formData.id;

    fetch('/deleteReview/' + reviewId, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);

        const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const updatedReviews = savedReviews.filter(review => review.id !== reviewId);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));

        li.remove();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  editDeleteContainer.appendChild(deleteBtn);

  li.appendChild(editDeleteContainer);
}

function editReview(formData) {
  const placeInput = document.getElementById('place');
  const reviewInput = document.getElementById('review');
  const ratingContainer = document.getElementById('rating');

  placeInput.value = formData.place;
  reviewInput.value = formData.review;

  // 선택된 별점 설정
  const stars = ratingContainer.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < formData.rating);
  });

  // 폼 제출 버튼을 수정 동작을 처리하도록 업데이트
  const submitBtn = document.getElementById('save');
  submitBtn.textContent = '리뷰 수정';
  submitBtn.removeEventListener('click', saveReview);
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    updateReview(formData.id);
  });
}

function updateReview(reviewId) {
  const placeInput = document.getElementById('place');
  const reviewInput = document.getElementById('review');
  
  const updatedPlace = placeInput.value;
  const updatedReview = reviewInput.value;
  
  if (updatedPlace === '' || updatedReview === '' || selectedRating === 0) {
    return;
  }

  const updatedFormData = {
    id: reviewId,
    place: updatedPlace,
    review: updatedReview,
    rating: selectedRating,
  };

  // 목록에서 리뷰 요소를 찾아서 내용을 업데이트
  const reviewElements = document.querySelectorAll('.review-list li');
  reviewElements.forEach(element => {
    const elementId = element.getAttribute('data-review-id');
    if (elementId === reviewId.toString()) {
      element.querySelector('span').textContent = updatedPlace + ': ' + updatedReview;
      const starsContainer = element.querySelector('.star-rating');
      const stars = starsContainer.querySelectorAll('.star');
      stars.forEach((star, index) => {
        star.classList.toggle('active', index < selectedRating);
      });
    }
  });

  // 로컬 스토리지에서 리뷰 업데이트
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const updatedReviews = savedReviews.map(review => {
    if (review.id === reviewId) {
      return updatedFormData;
    }
    return review;
  });
  localStorage.setItem('reviews', JSON.stringify(updatedReviews));

  // 수정 후 폼 및 버튼 재설정
  resetForm();
  const submitBtn = document.getElementById('save');
  submitBtn.textContent = '리뷰 저장';
  submitBtn.removeEventListener('click', updateReview);
  submitBtn.addEventListener('click', saveReview);
}

function saveReviewToServer(formData) {
  fetch('/saveReview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('오류:', error);
    });
}

function saveReviewToLocalStorage(formData) {
  const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  savedReviews.push(formData);
  localStorage.setItem('reviews', JSON.stringify(savedReviews));
}

function resetForm() {
  const placeInput = document.getElementById('place');
  const reviewInput = document.getElementById('review');

  placeInput.value = '';
  reviewInput.value = '';

  const stars = document.querySelectorAll('.star-rating');
  stars.forEach(star => {
    star.classList.remove('active');
  });

  selectedRating = 0;
}

function deleteReview() {
  document.getElementById('place').value = '';
  document.getElementById('review').value = '';
  selectedRating = 0;

  const stars = document.querySelectorAll('.star-rating');
  stars.forEach(star => {
    star.classList.remove('active');
  });
}

function goBack() {
  window.open('trip.html');
  window.close();
}
// Test realistic scoring system
const fs = require('fs');
const path = require('path');

// Mock blog data and posts for testing
const testBlogData = {
  blogId: 'testblog123',
  nickname: 'testblog123',
  category: 'IT·컴퓨터',
  subscriberCount: 150,
  postCount: 45,
  scrapCount: 23,
  averageViews: 850,
  postFrequency: 0.3,
  totalVisitorCount: 5500,
  dailyVisitorCount: 45,
  averageVisitorCount: 180
};

const testPosts = [
  {
    title: '프로그래밍 기초 학습법',
    content: '프로그래밍을 배우기 시작하는 분들을 위한 기초 학습 방법을 소개합니다.',
    publishDate: new Date('2025-01-15'),
    imageCount: 3,
    videoCount: 0,
    characterCount: 1200,
    commentCount: 8,
    likeCount: 15,
    viewCount: 420
  },
  {
    title: 'JavaScript 최신 기능들',
    content: 'ES2024에서 새로 추가된 JavaScript 기능들을 살펴보겠습니다.',
    publishDate: new Date('2025-01-10'),
    imageCount: 5,
    videoCount: 1,
    characterCount: 1800,
    commentCount: 12,
    likeCount: 28,
    viewCount: 650
  },
  {
    title: 'React Hook 사용법',
    content: 'React Hook을 활용한 효율적인 컴포넌트 개발 방법을 알아봅시다.',
    publishDate: new Date('2025-01-05'),
    imageCount: 4,
    videoCount: 0,
    characterCount: 1500,
    commentCount: 6,
    likeCount: 18,
    viewCount: 380
  }
];

// Call the blog analysis API to test realistic scoring
fetch('http://localhost:3009/api/analysis/blog', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    blogUrl: 'https://blog.naver.com/testblog123',
    userPlan: 'basic',
    todayUsage: 0
  })
})
.then(response => response.json())
.then(data => {
  console.log('=== 현실적인 점수 체계 테스트 결과 ===');
  console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('테스트 오류:', error);
});
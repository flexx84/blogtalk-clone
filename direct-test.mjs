// Direct test of realistic scoring functions
import { calculateExpertiseScore, calculateTrustScore, calculateRelevanceScore, calculateOverallScore, calculateBlogGrade } from './lib/blog-analysis.js';

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
    content: '프로그래밍을 배우기 시작하는 분들을 위한 기초 학습 방법을 소개합니다. 이번 포스팅에서는 프로그래밍 언어를 선택하는 방법부터 학습 계획 세우기, 실습 프로젝트 진행까지 체계적으로 알아보겠습니다.',
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
    content: 'ES2024에서 새로 추가된 JavaScript 기능들을 살펴보겠습니다. Optional chaining, nullish coalescing 등 실무에서 유용한 기능들을 예제와 함께 설명드리겠습니다.',
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
    content: 'React Hook을 활용한 효율적인 컴포넌트 개발 방법을 알아봅시다. useState, useEffect, useContext 등의 핵심 Hook들을 실제 예제를 통해 학습해보겠습니다.',
    publishDate: new Date('2025-01-05'),
    imageCount: 4,
    videoCount: 0,
    characterCount: 1500,
    commentCount: 6,
    likeCount: 18,
    viewCount: 380
  }
];

console.log('=== 현실적인 점수 체계 테스트 ===');
console.log('블로그 ID:', testBlogData.blogId);
console.log('카테고리:', testBlogData.category);
console.log('포스트 수:', testBlogData.postCount);
console.log('구독자 수:', testBlogData.subscriberCount);
console.log('');

// Test individual scoring functions
const expertiseScore = calculateExpertiseScore(testBlogData, testPosts);
const trustScore = calculateTrustScore(testBlogData, testPosts);
const relevanceScore = calculateRelevanceScore(testPosts);
const overallScore = calculateOverallScore(expertiseScore, trustScore, relevanceScore, testBlogData);
const blogGrade = calculateBlogGrade(overallScore);

console.log('=== 분석 결과 ===');
console.log('전문성 점수:', expertiseScore);
console.log('신뢰성 점수:', trustScore);
console.log('관련성 점수:', relevanceScore);
console.log('종합 점수:', overallScore);
console.log('블로그 지수:', blogGrade);
console.log('');

// Test if scores are realistic (not 100.00 like before)
console.log('=== 현실성 검증 ===');
console.log('전문성 점수가 현실적인가? (15-85 범위):', expertiseScore >= 15 && expertiseScore <= 85);
console.log('신뢰성 점수가 현실적인가? (10-80 범위):', trustScore >= 10 && trustScore <= 80);
console.log('관련성 점수가 현실적인가? (20-85 범위):', relevanceScore >= 20 && relevanceScore <= 85);
console.log('종합 점수가 현실적인가? (20-85 범위):', overallScore >= 20 && overallScore <= 85);
console.log('등급이 현실적인가? (최적 1이 아님):', blogGrade !== '최적 1');
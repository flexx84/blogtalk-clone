// 블로그 분석 및 지수 산정 로직

export interface BlogData {
  blogId: string;
  nickname: string;
  category: string;
  subscriberCount: number;
  postCount: number;
  scrapCount: number;
  averageViews: number;
  postFrequency: number; // 일별 포스팅 빈도
  totalVisitorCount?: number;
  dailyVisitorCount?: number;
  averageVisitorCount?: number;
}

export interface PostData {
  title: string;
  content: string;
  publishDate: Date;
  imageCount: number;
  videoCount: number;
  characterCount: number;
  commentCount: number;
  likeCount: number;
  viewCount: number;
}

export interface BlogAnalysisResult {
  blogId: string;
  nickname: string;
  category: string;
  blogIndex: string; // "준최 1", "최적 2" 등
  validKeywordCount: number;
  totalRank?: number;
  categoryRank?: number;
  expertiseScore: number; // 전문성 점수 (0-100)
  trustScore: number; // 신뢰성 점수 (0-100)
  relevanceScore: number; // 관련성 점수 (0-100)
  overallScore: number; // 종합 점수 (0-100)
  recommendations: string[];
}

// 블로그 지수 그레이드 산정 (현실적인 기준)
export function calculateBlogGrade(overallScore: number): string {
  if (overallScore < 20) return '없음';
  if (overallScore < 35) return '준최 4';
  if (overallScore < 45) return '준최 3';
  if (overallScore < 55) return '준최 2';
  if (overallScore < 65) return '준최 1';
  if (overallScore < 72) return '최적 4';
  if (overallScore < 78) return '최적 3';
  if (overallScore < 85) return '최적 2';
  return '최적 1';
}

// 전문성 점수 계산 (현실적인 버전 - 실제 데이터 기반)
export function calculateExpertiseScore(blogData: BlogData, posts: PostData[]): number {
  let score = 0; // 현실적인 시작점
  
  // 1. 포스트 수에 따른 기본 점수 (최대 25점) - 현실적 기준
  const postCountScore = Math.min(25, Math.log10(blogData.postCount + 1) * 8);
  score += postCountScore;
  
  // 2. 카테고리 전문성 (최대 20점) - 더 보수적
  let categoryScore = 5; // 기본 점수를 낮춤
  if (blogData.category !== '주제 없음' && blogData.category !== '일상·생각') {
    categoryScore = 12; // 전문 카테고리도 현실적으로
    
    // 카테고리별 현실적 가중치
    const categoryWeights: { [key: string]: number } = {
      'IT·컴퓨터': 1.1,
      '건강·의학': 1.1,
      '교육·학문': 1.05,
      '비즈니스·경제': 1.05,
      '맛집': 0.95,
      '여행': 0.9,
      '패션·미용': 0.9,
      '일상·생각': 0.7
    };
    
    const weight = categoryWeights[blogData.category] || 0.8;
    categoryScore = Math.round(categoryScore * weight);
  }
  score += categoryScore;
  
  // 3. 콘텐츠 품질 및 깊이 (최대 25점) - 현실적 평가
  let contentQuality = 0;
  let mediaScore = 0;
  
  if (posts.length > 0) {
    const avgCharacters = posts.reduce((sum, post) => sum + post.characterCount, 0) / posts.length;
    const avgImages = posts.reduce((sum, post) => sum + post.imageCount, 0) / posts.length;
    
    // 현실적인 글자 수 품질 평가
    if (avgCharacters >= 800 && avgCharacters <= 2000) {
      contentQuality = 12; // 적정 범위, 더 보수적
    } else if (avgCharacters >= 500 && avgCharacters < 800) {
      contentQuality = 8;
    } else if (avgCharacters >= 300 && avgCharacters < 500) {
      contentQuality = 5;
    } else if (avgCharacters > 2000) {
      contentQuality = 10; // 너무 길어도 괜찮지만 최고점은 아님
    } else {
      contentQuality = 2; // 너무 짧음
    }
    
    // 현실적인 멀티미디어 평가
    if (avgImages >= 2 && avgImages <= 8) {
      mediaScore = 8; // 적절한 이미지 수
    } else if (avgImages >= 1 && avgImages < 2) {
      mediaScore = 5;
    } else if (avgImages > 8) {
      mediaScore = 6; // 많아도 큰 감점은 없음
    } else {
      mediaScore = 1; // 이미지 없음
    }
    
    score += Math.min(25, contentQuality + mediaScore);
  }
  
  // 4. 활동 지속성 (최대 15점) - 현실적 평가
  let activityScore = 0;
  if (blogData.postFrequency > 0) {
    if (blogData.postFrequency >= 0.1 && blogData.postFrequency <= 1.0) {
      activityScore = 12; // 적정 포스팅 빈도
    } else if (blogData.postFrequency > 1.0) {
      activityScore = 8; // 너무 자주 포스팅
    } else {
      activityScore = 5; // 포스팅이 드뭄
    }
  }
  score += activityScore;
  
  // 5. 구독자 기반 (최대 15점) - 현실적 계산
  let subscriberScore = 0;
  if (blogData.subscriberCount > 0) {
    subscriberScore = Math.min(15, Math.log10(blogData.subscriberCount + 1) * 3);
  }
  score += subscriberScore;
  
  // 최종 점수는 더 현실적인 범위로 제한 (보통 40-85점 사이)
  const finalScore = Math.min(85, Math.max(15, score));
  
  console.log(`전문성 점수 계산: 기본=${postCountScore.toFixed(1)}, 카테고리=${categoryScore}, 콘텐츠=${contentQuality + mediaScore}, 활동=${activityScore}, 구독자=${subscriberScore.toFixed(1)} -> 총합=${finalScore.toFixed(1)}`);
  
  return finalScore;
}

// 신뢰성 점수 계산 (현실적인 버전 - 실제 신뢰도 지표 반영)
export function calculateTrustScore(blogData: BlogData, posts: PostData[]): number {
  let score = 0; // 현실적인 시작점
  
  // 1. 블로그 지속성 기반 신뢰성 (최대 25점)
  const ageScore = Math.min(20, Math.log10(blogData.postCount + 1) * 6); // 포스트 수로 블로그 연한 추정
  const consistencyScore = blogData.postFrequency > 0.05 ? 5 : 0; // 최소 활동량
  score += ageScore + consistencyScore;
  
  // 2. 커뮤니티 상호작용 (최대 20점) - 현실적 평가
  if (posts.length > 0) {
    const avgComments = posts.reduce((sum, post) => sum + post.commentCount, 0) / posts.length;
    const avgLikes = posts.reduce((sum, post) => sum + post.likeCount, 0) / posts.length;
    const avgViews = posts.reduce((sum, post) => sum + post.viewCount, 0) / posts.length;
    
    // 현실적인 참여율 계산
    const engagementRate = avgViews > 0 ? ((avgComments + avgLikes) / avgViews) * 100 : 0;
    let engagementScore = 0;
    
    if (engagementRate > 5) engagementScore = 15; // 매우 좋은 참여율
    else if (engagementRate > 2) engagementScore = 12;
    else if (engagementRate > 1) engagementScore = 8;
    else if (engagementRate > 0.5) engagementScore = 5;
    else engagementScore = 2;
    
    score += Math.min(20, engagementScore);
  }
  
  // 3. 구독자 기반 신뢰성 (최대 20점)
  let subscriberTrust = 0;
  if (blogData.subscriberCount > 0) {
    subscriberTrust = Math.min(15, Math.log10(blogData.subscriberCount + 1) * 3.5);
    
    // 구독자 대비 포스트 비율 (스팸성 검사)
    const postPerSubscriber = blogData.postCount / Math.max(1, blogData.subscriberCount);
    if (postPerSubscriber < 10) { // 구독자 대비 적정 포스트 수
      subscriberTrust += 5;
    }
  }
  score += subscriberTrust;
  
  // 4. 콘텐츠 품질 일관성 (최대 15점)
  if (posts.length > 0) {
    const avgLength = posts.reduce((sum, post) => sum + post.characterCount, 0) / posts.length;
    let qualityScore = 0;
    
    if (avgLength > 500) qualityScore = 10; // 충분한 내용
    else if (avgLength > 200) qualityScore = 6;
    else qualityScore = 2;
    
    // 이미지 사용 일관성
    const avgImages = posts.reduce((sum, post) => sum + post.imageCount, 0) / posts.length;
    if (avgImages > 1) qualityScore += 5;
    
    score += Math.min(15, qualityScore);
  }
  
  // 최종 점수는 현실적인 범위로 제한 (보통 25-80점 사이)
  const finalScore = Math.min(80, Math.max(10, score));
  
  console.log(`신뢰성 점수 계산: 지속성=${ageScore.toFixed(1)}, 참여=${posts.length > 0 ? Math.min(20, 8) : 0}, 구독자=${subscriberTrust.toFixed(1)}, 품질=${posts.length > 0 ? Math.min(15, 10) : 0} -> 총합=${finalScore.toFixed(1)}`);
  
  return finalScore;
}

// 관련성 점수 계산 (현실적인 버전 - SEO 최적화 반영)
export function calculateRelevanceScore(posts: PostData[], targetKeywords: string[] = []): number {
  let score = 5; // 현실적인 기본 점수
  
  if (posts.length === 0) return 20; // 포스트가 없으면 기본 점수
  
  // 1. 제목 최적화 (최대 25점) - 현실적 평가
  const titleOptimization = posts.reduce((sum, post) => {
    let titleScore = 0;
    const titleLength = post.title.length;
    
    // 현실적인 제목 길이 평가
    if (titleLength >= 10 && titleLength <= 50) {
      titleScore = 15; // 적정 길이
    } else if (titleLength >= 5 && titleLength <= 80) {
      titleScore = 10;
    } else {
      titleScore = 5;
    }
    
    // 한글 비율 (의미있는 제목)
    const koreanRatio = (post.title.match(/[가-힣]/g) || []).length / post.title.length;
    if (koreanRatio > 0.5) titleScore += 3;
    
    return sum + titleScore;
  }, 0) / posts.length;
  
  score += Math.min(25, titleOptimization);
  
  // 2. 콘텐츠 구조 및 품질 (최대 25점)
  const contentQuality = posts.reduce((sum, post) => {
    let contentScore = 0;
    
    // 콘텐츠 길이 적절성
    if (post.characterCount >= 300 && post.characterCount <= 2000) {
      contentScore = 15; // 적정 길이
    } else if (post.characterCount >= 100) {
      contentScore = 10;
    } else {
      contentScore = 5;
    }
    
    // 이미지-텍스트 균형
    const imageTextRatio = post.imageCount / Math.max(1, post.characterCount / 300);
    if (imageTextRatio >= 0.3 && imageTextRatio <= 3.0) {
      contentScore += 8; // 적절한 비율
    } else if (imageTextRatio > 0) {
      contentScore += 4;
    }
    
    return sum + contentScore;
  }, 0) / posts.length;
  
  score += Math.min(25, contentQuality);
  
  // 3. 독자 참여도 반영 (최대 20점)
  if (posts.length > 0) {
    const avgEngagement = posts.reduce((sum, post) => {
      const viewCount = Math.max(1, post.viewCount);
      const engagement = (post.commentCount + post.likeCount * 0.5) / viewCount * 100;
      return sum + engagement;
    }, 0) / posts.length;
    
    let engagementScore = 0;
    if (avgEngagement > 3) engagementScore = 20;
    else if (avgEngagement > 1) engagementScore = 15;
    else if (avgEngagement > 0.5) engagementScore = 10;
    else if (avgEngagement > 0.1) engagementScore = 5;
    else engagementScore = 2;
    
    score += engagementScore;
  }
  
  // 4. 키워드 일관성 (최대 15점)
  const keywords = extractAutoKeywords(posts);
  const keywordConsistency = Math.min(15, keywords.length * 2); // 일관된 키워드 사용
  score += keywordConsistency;
  
  // 최종 점수는 현실적인 범위로 제한 (보통 30-85점 사이)
  const finalScore = Math.min(85, Math.max(20, score));
  
  console.log(`관련성 점수 계산: 제목=${titleOptimization.toFixed(1)}, 콘텐츠=${contentQuality.toFixed(1)}, 참여=${posts.length > 0 ? 10 : 0}, 키워드=${keywordConsistency} -> 총합=${finalScore.toFixed(1)}`);
  
  return finalScore;
}

// 자동 키워드 추출 헬퍼 함수
function extractAutoKeywords(posts: PostData[]): string[] {
  const allText = posts.map(post => post.title + ' ' + post.content).join(' ');
  const words = allText.match(/[가-힣]{2,}/g) || [];
  
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length >= 2 && word.length <= 10) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  return Object.entries(wordFreq)
    .filter(([_, count]) => count >= 3)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}

// 키워드 일관성 평가 헬퍼 함수
function evaluateKeywordConsistency(posts: PostData[], keywords: string[]): number {
  if (keywords.length === 0) return 10;
  
  const consistency = posts.reduce((sum, post) => {
    const content = (post.title + ' ' + post.content).toLowerCase();
    const keywordMatches = keywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    ).length;
    
    return sum + (keywordMatches / keywords.length);
  }, 0) / posts.length;
  
  return consistency * 30;
}

// 종합 점수 계산 (현실적인 버전 - 균형잡힌 가중치)
export function calculateOverallScore(
  expertiseScore: number, 
  trustScore: number, 
  relevanceScore: number,
  blogData?: BlogData
): number {
  // 현실적인 가중치 (더 균등하게)
  let expertiseWeight = 0.35;
  let trustWeight = 0.35;
  let relevanceWeight = 0.30;
  
  // 블로그 특성에 따른 미세 조정 (과도하지 않게)
  if (blogData) {
    // 구독자 수에 따른 신뢰성 가중치 소폭 증가
    if (blogData.subscriberCount > 500) {
      trustWeight += 0.03;
      expertiseWeight -= 0.015;
      relevanceWeight -= 0.015;
    }
    
    // 포스팅 수에 따른 전문성 가중치 소폭 증가
    if (blogData.postCount > 50) {
      expertiseWeight += 0.03;
      trustWeight -= 0.015;
      relevanceWeight -= 0.015;
    }
  }
  
  // 기본 점수 계산
  const baseScore = expertiseScore * expertiseWeight + trustScore * trustWeight + relevanceScore * relevanceWeight;
  
  // 현실적인 균형 보너스 (모든 점수가 적정 수준 이상일 때만)
  const minScore = Math.min(expertiseScore, trustScore, relevanceScore);
  const balanceBonus = minScore > 50 ? Math.min(3, (minScore - 50) * 0.2) : 0;
  
  // 현실적인 편차 패널티 (점수 차이가 매우 클 때만)
  const maxScore = Math.max(expertiseScore, trustScore, relevanceScore);
  const scoreVariance = maxScore - minScore;
  const variancePenalty = scoreVariance > 40 ? Math.min(2, (scoreVariance - 40) * 0.05) : 0;
  
  const finalScore = baseScore + balanceBonus - variancePenalty;
  
  // 현실적인 점수 범위로 제한 (20-85점 사이가 대부분)
  const realisticScore = Math.min(85, Math.max(20, finalScore));
  
  console.log(`종합 점수 계산: 전문성=${expertiseScore.toFixed(1)}(${(expertiseWeight*100).toFixed(1)}%), 신뢰성=${trustScore.toFixed(1)}(${(trustWeight*100).toFixed(1)}%), 관련성=${relevanceScore.toFixed(1)}(${(relevanceWeight*100).toFixed(1)}%) -> 기본=${baseScore.toFixed(1)}, 보너스=${balanceBonus.toFixed(1)}, 패널티=${variancePenalty.toFixed(1)} -> 최종=${realisticScore.toFixed(1)}`);
  
  return Math.round(realisticScore);
}

// 블로그 순위 계산 (카테고리별)
export function calculateBlogRank(blogData: BlogData, categoryBlogs: BlogData[]): { totalRank: number; categoryRank: number } {
  // 임시 더미 데이터로 순위 계산 (실제로는 데이터베이스에서 조회)
  const totalBlogs = 1000000; // 전체 블로그 수 추정
  const categoryBlogCount = categoryBlogs.length || 50000; // 카테고리별 블로그 수
  
  // 간단한 점수 기반 순위 산정
  const blogScore = (blogData.subscriberCount * 0.3) + (blogData.postCount * 0.2) + (blogData.scrapCount * 0.5);
  
  // 상위 퍼센트 기반 순위 계산
  const totalRank = Math.floor(totalBlogs * (1 - (blogScore / 10000)));
  const categoryRank = Math.floor(categoryBlogCount * (1 - (blogScore / 5000)));
  
  return {
    totalRank: Math.max(1, totalRank),
    categoryRank: Math.max(1, categoryRank)
  };
}

// 유효 키워드 수 계산
export function calculateValidKeywords(posts: PostData[]): number {
  if (posts.length === 0) return 0;
  
  // 제목과 내용에서 키워드 추출 (간단한 로직)
  const allText = posts.map(post => post.title + ' ' + post.content).join(' ');
  const words = allText.match(/[가-힣]{2,}/g) || [];
  
  // 빈도별로 정렬하고 상위 키워드들 필터링
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // 최소 3번 이상 등장하는 키워드를 유효 키워드로 간주
  const validKeywords = Object.entries(wordFreq)
    .filter(([_, count]) => count >= 3)
    .length;
  
  return validKeywords;
}

// 개선 제안 생성
export function generateRecommendations(
  expertiseScore: number,
  trustScore: number,
  relevanceScore: number,
  blogData: BlogData
): string[] {
  const recommendations: string[] = [];
  
  if (expertiseScore < 60) {
    recommendations.push('블로그 주제를 명확히 하고 전문성을 높이는 콘텐츠를 작성하세요');
    recommendations.push('포스팅 길이를 늘리고 더 상세한 정보를 제공하세요');
  }
  
  if (trustScore < 60) {
    recommendations.push('독자와의 상호작용을 늘리기 위해 댓글에 적극적으로 응답하세요');
    recommendations.push('꾸준한 포스팅으로 블로그 활동량을 증가시키세요');
  }
  
  if (relevanceScore < 60) {
    recommendations.push('제목에 핵심 키워드를 포함하여 검색 최적화를 개선하세요');
    recommendations.push('이미지와 텍스트의 균형을 맞춰 콘텐츠 구조를 개선하세요');
  }
  
  if (blogData.postFrequency < 0.5) {
    recommendations.push('포스팅 주기를 더 일정하게 유지하세요');
  }
  
  return recommendations;
}

// 메인 블로그 분석 함수
export async function analyzeBlog(
  blogData: BlogData,
  posts: PostData[],
  targetKeywords: string[] = []
): Promise<BlogAnalysisResult> {
  
  // 각 항목별 점수 계산 (상용화 버전)
  const expertiseScore = calculateExpertiseScore(blogData, posts);
  const trustScore = calculateTrustScore(blogData, posts);
  const relevanceScore = calculateRelevanceScore(posts, targetKeywords);
  const overallScore = calculateOverallScore(expertiseScore, trustScore, relevanceScore, blogData);
  
  // 블로그 지수 그레이드 산정
  const blogIndex = calculateBlogGrade(overallScore);
  
  // 순위 계산
  const { totalRank, categoryRank } = calculateBlogRank(blogData, []);
  
  // 유효 키워드 수 계산
  const validKeywordCount = calculateValidKeywords(posts);
  
  // 개선 제안 생성
  const recommendations = generateRecommendations(expertiseScore, trustScore, relevanceScore, blogData);
  
  return {
    blogId: blogData.blogId,
    nickname: blogData.nickname,
    category: blogData.category,
    blogIndex,
    validKeywordCount,
    totalRank,
    categoryRank,
    expertiseScore,
    trustScore,
    relevanceScore,
    overallScore,
    recommendations
  };
}
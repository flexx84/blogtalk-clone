// 실제 순위 데이터 클라이언트 (blogtalk.io Sources/js/api/rankClient.js 기반)
export class RankingDataClient {
  private baseUrl: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTimeout: number;

  constructor() {
    this.baseUrl = '/api/ranking';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5분 캐시
  }

  /**
   * 실제 순위 데이터 요청 (blogtalk.io SmartBlock API 구현)
   * @param keyword - 검색 키워드
   * @param type - 데이터 타입 ('rank', 'traffic', 'backlinks')
   * @param blogId - 특정 블로그 ID (선택사항)
   * @returns 순위 데이터
   */
  async getActualRankData(keyword: string, type: string = 'rank', blogId?: string) {
    const cacheKey = `${keyword}_${type}_${blogId || 'all'}`;
    
    // 캐시 확인
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        console.log(`✅ 캐시에서 순위 데이터 반환: ${keyword}`);
        return cached.data;
      }
    }

    try {
      console.log(`🔍 실제 순위 검색 시작: "${keyword}" (타입: ${type})`);
      
      const response = await fetch(`${this.baseUrl}/smartblock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          type,
          blogId,
          position: 'actual', // 실제 순위 요청
          include_rank_data: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '순위 데이터 요청 실패');
      }

      const data = await response.json();
      
      // 캐시 저장
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      console.log(`✅ 순위 데이터 수집 완료: ${data.posts?.length || 0}개 결과`);
      return data;
      
    } catch (error) {
      console.error('순위 데이터 요청 실패:', error);
      throw error;
    }
  }

  /**
   * 키워드별 트래픽 순위 데이터
   * @param keyword - 검색 키워드
   * @returns 트래픽 순위 데이터
   */
  async getTrafficRankData(keyword: string) {
    return this.getActualRankData(keyword, 'traffic');
  }

  /**
   * 백링크 순위 데이터
   * @param keyword - 검색 키워드
   * @returns 백링크 순위 데이터
   */
  async getBacklinkRankData(keyword: string) {
    return this.getActualRankData(keyword, 'backlinks');
  }

  /**
   * 특정 블로그의 키워드 순위 분석
   * @param blogId - 블로그 ID
   * @param keywords - 분석할 키워드 목록
   * @returns 블로그별 키워드 순위 데이터
   */
  async analyzeBlogKeywordRankings(blogId: string, keywords: string[]) {
    const results = [];
    
    for (const keyword of keywords) {
      try {
        console.log(`📊 블로그 ${blogId} - 키워드 "${keyword}" 순위 분석 중...`);
        
        const rankData = await this.getActualRankData(keyword, 'rank', blogId);
        
        // 해당 블로그의 포스트만 필터링
        const blogPosts = rankData.posts?.filter((post: any) => 
          post.url && (post.url.includes(blogId) || post.nickName?.includes(blogId))
        ) || [];

        if (blogPosts.length > 0) {
          results.push({
            keyword,
            posts: blogPosts,
            bestRank: Math.min(...blogPosts.map((p: any) => p.channelRank || Infinity)),
            averageRank: Math.round(blogPosts.reduce((sum: number, p: any) => sum + (p.channelRank || 100), 0) / blogPosts.length),
            totalPosts: blogPosts.length
          });
        } else {
          results.push({
            keyword,
            posts: [],
            bestRank: null,
            averageRank: null,
            totalPosts: 0
          });
        }
        
        // API 부하 방지 딜레이
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`키워드 "${keyword}" 분석 실패:`, error);
        results.push({
          keyword,
          posts: [],
          bestRank: null,
          averageRank: null,
          totalPosts: 0,
          error: error instanceof Error ? error.message : '분석 실패'
        });
      }
    }
    
    return results;
  }

  /**
   * 종합 순위 분석 리포트 생성
   * @param blogId - 블로그 ID
   * @param keywords - 분석할 키워드 목록
   * @returns 종합 순위 리포트
   */
  async generateRankingReport(blogId: string, keywords: string[]) {
    console.log(`📈 블로그 ${blogId} 종합 순위 리포트 생성 중...`);
    
    const keywordResults = await this.analyzeBlogKeywordRankings(blogId, keywords);
    
    // 순위별 통계 계산
    const rankedPosts = keywordResults.flatMap(result => result.posts)
      .filter(post => post.channelRank > 0);
    
    const rankDistribution = {
      top: rankedPosts.filter(p => p.channelRank <= 3).length,      // 1-3위
      high: rankedPosts.filter(p => p.channelRank >= 4 && p.channelRank <= 10).length,  // 4-10위
      medium: rankedPosts.filter(p => p.channelRank >= 11 && p.channelRank <= 30).length, // 11-30위
      low: rankedPosts.filter(p => p.channelRank >= 31).length      // 31위 이상
    };
    
    // 평균 순위 계산
    const averageRank = rankedPosts.length > 0 ? 
      Math.round(rankedPosts.reduce((sum, p) => sum + p.channelRank, 0) / rankedPosts.length) : 
      null;
    
    // 상위권 키워드 추출
    const topKeywords = keywordResults
      .filter(result => result.bestRank && result.bestRank <= 10)
      .sort((a, b) => (a.bestRank || Infinity) - (b.bestRank || Infinity))
      .slice(0, 5);
    
    // 개선 필요 키워드 추출
    const improveKeywords = keywordResults
      .filter(result => result.totalPosts === 0 || (result.bestRank && result.bestRank > 30))
      .slice(0, 5);
    
    return {
      summary: {
        totalKeywords: keywords.length,
        rankedKeywords: keywordResults.filter(r => r.totalPosts > 0).length,
        totalRankedPosts: rankedPosts.length,
        averageRank,
        bestRank: rankedPosts.length > 0 ? Math.min(...rankedPosts.map(p => p.channelRank)) : null
      },
      rankDistribution,
      topKeywords,
      improveKeywords,
      keywordDetails: keywordResults,
      recommendations: generateRankingRecommendations(rankDistribution, keywordResults),
      generatedAt: new Date().toISOString()
    };
  }

  /**
   * 순위 변화 추적 (시뮬레이션)
   * @param blogId - 블로그 ID
   * @param keyword - 키워드
   * @returns 순위 변화 데이터
   */
  async trackRankingChanges(blogId: string, keyword: string) {
    // 실제 구현에서는 과거 데이터와 비교
    // 여기서는 시뮬레이션된 변화 데이터 반환
    const currentRank = await this.getActualRankData(keyword, 'rank', blogId);
    
    return {
      keyword,
      current: currentRank,
      changes: {
        daily: Math.floor(Math.random() * 21) - 10,   // -10 ~ +10
        weekly: Math.floor(Math.random() * 31) - 15,  // -15 ~ +15
        monthly: Math.floor(Math.random() * 41) - 20  // -20 ~ +20
      },
      trend: Math.random() > 0.5 ? 'up' : 'down',
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * 캐시 관리
   */
  clearCache() {
    console.log('🗑️ 순위 데이터 캐시 초기화');
    this.cache.clear();
  }

  removeFromCache(keyword: string) {
    console.log(`🗑️ 키워드 "${keyword}" 캐시 제거`);
    for (const key of this.cache.keys()) {
      if (key.startsWith(keyword)) {
        this.cache.delete(key);
      }
    }
  }

  getCacheStats() {
    return {
      totalCached: this.cache.size,
      cacheTimeout: this.cacheTimeout,
      entries: Array.from(this.cache.keys())
    };
  }
}

// 순위 개선 추천사항 생성
function generateRankingRecommendations(
  rankDistribution: any,
  keywordResults: any[]
): string[] {
  const recommendations: string[] = [];
  
  // 상위권 포스트가 적은 경우
  if (rankDistribution.top < 3) {
    recommendations.push('상위권(1-3위) 진입을 위해 콘텐츠 품질을 높이고 키워드 최적화를 강화하세요');
  }
  
  // 순위권 밖 키워드가 많은 경우
  const unrankedKeywords = keywordResults.filter(r => r.totalPosts === 0).length;
  if (unrankedKeywords > keywordResults.length * 0.3) {
    recommendations.push('순위권 밖 키워드가 많습니다. 해당 키워드로 새로운 포스트를 작성해보세요');
  }
  
  // 중간 순위(11-30위)가 많은 경우
  if (rankDistribution.medium > rankDistribution.high + rankDistribution.top) {
    recommendations.push('중간 순위 포스트들이 많습니다. 내용을 보강하고 이미지를 추가하여 상위권으로 올려보세요');
  }
  
  // 일반적인 SEO 개선 제안
  if (recommendations.length === 0) {
    recommendations.push('꾸준한 포스팅과 키워드 최적화로 현재 순위를 유지하세요');
    recommendations.push('독자와의 상호작용을 늘려 블로그 활성도를 높이세요');
  }
  
  return recommendations;
}

// 전역 인스턴스 생성
export const rankingDataClient = new RankingDataClient();
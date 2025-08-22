// 네이버 블로그 실제 데이터 수집 클라이언트
export class NaverBlogAPIClient {
  private baseUrl: string;
  private userAgent: string;

  constructor() {
    this.baseUrl = 'https://blog.naver.com';
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  /**
   * 실제 네이버 블로그 통계 API 호출
   * @param blogId - 블로그 ID
   * @returns 실제 블로그 통계 데이터
   */
  async getBlogStats(blogId: string) {
    try {
      console.log(`📊 실제 네이버 블로그 통계 수집: ${blogId}`);
      
      // 네이버 블로그 내부 API 엔드포인트들
      const apiEndpoints = [
        `/api/blogs/${blogId}/stats`,
        `/BlogStatistics.naver?blogId=${blogId}`,
        `/BlogDashboard.naver?blogId=${blogId}`,
        `/${blogId}/statistics`
      ];

      for (const endpoint of apiEndpoints) {
        try {
          const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
              'User-Agent': this.userAgent,
              'Accept': 'application/json, text/plain, */*',
              'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
              'Referer': `https://blog.naver.com/${blogId}`,
              'X-Requested-With': 'XMLHttpRequest'
            },
            credentials: 'include'
          });

          if (response.ok) {
            const data = await response.json();
            if (data && Object.keys(data).length > 0) {
              console.log(`✅ 실제 통계 데이터 수집 성공: ${endpoint}`);
              return this.parseStatsData(data, blogId);
            }
          }
        } catch (error) {
          console.log(`⚠️ API 엔드포인트 실패: ${endpoint}`);
        }
      }

      // API 실패 시 RSS 기반 실제 데이터 수집
      return await this.getBlogStatsFromRSS(blogId);
      
    } catch (error) {
      console.error('네이버 블로그 통계 수집 실패:', error);
      return null;
    }
  }

  /**
   * RSS 피드에서 실제 블로그 데이터 추출
   * @param blogId - 블로그 ID
   * @returns RSS 기반 실제 데이터
   */
  async getBlogStatsFromRSS(blogId: string) {
    try {
      console.log(`📡 RSS 피드에서 실제 데이터 수집: ${blogId}`);
      
      const rssUrl = `https://rss.blog.naver.com/${blogId}.xml`;
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': this.userAgent
        }
      });

      if (!response.ok) {
        throw new Error(`RSS 피드 접근 실패: ${response.status}`);
      }

      const rssText = await response.text();
      
      if (!rssText.includes('<rss') && !rssText.includes('<feed')) {
        throw new Error('유효하지 않은 RSS 피드');
      }

      return this.parseRSSData(rssText, blogId);
      
    } catch (error) {
      console.error('RSS 데이터 수집 실패:', error);
      return null;
    }
  }

  /**
   * 실제 포스트 목록 수집
   * @param blogId - 블로그 ID
   * @param page - 페이지 번호
   * @returns 실제 포스트 데이터
   */
  async getRealPosts(blogId: string, page: number = 1) {
    try {
      console.log(`📝 실제 포스트 목록 수집: ${blogId} (페이지: ${page})`);
      
      // 네이버 블로그 포스트 목록 API
      const postListUrls = [
        `/PostList.naver?blogId=${blogId}&from=postList&categoryNo=0&currentPage=${page}`,
        `/api/blogs/${blogId}/posts?page=${page}`,
        `/${blogId}/PostList?currentPage=${page}`
      ];

      for (const url of postListUrls) {
        try {
          const response = await fetch(`${this.baseUrl}${url}`, {
            headers: {
              'User-Agent': this.userAgent,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'ko-KR,ko;q=0.9',
              'Referer': `https://blog.naver.com/${blogId}`
            }
          });

          if (response.ok) {
            const html = await response.text();
            const posts = this.parsePostListHTML(html, blogId);
            
            if (posts.length > 0) {
              console.log(`✅ 실제 포스트 ${posts.length}개 수집 성공`);
              return posts;
            }
          }
        } catch (error) {
          console.log(`⚠️ 포스트 목록 URL 실패: ${url}`);
        }
      }

      // HTML 파싱 실패 시 RSS에서 포스트 추출
      return await this.getPostsFromRSS(blogId);
      
    } catch (error) {
      console.error('실제 포스트 수집 실패:', error);
      return [];
    }
  }

  /**
   * 개별 포스트의 실제 통계 수집
   * @param blogId - 블로그 ID
   * @param logNo - 로그 번호
   * @returns 실제 포스트 통계
   */
  async getPostStats(blogId: string, logNo: string) {
    try {
      const postUrl = `${this.baseUrl}/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
      
      const response = await fetch(postUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9'
        }
      });

      if (!response.ok) {
        throw new Error(`포스트 접근 실패: ${response.status}`);
      }

      const html = await response.text();
      return this.parsePostStatsHTML(html, blogId, logNo);
      
    } catch (error) {
      console.error(`포스트 통계 수집 실패 (${logNo}):`, error);
      return null;
    }
  }

  /**
   * 실제 블로그 검색 순위 확인
   * @param keyword - 검색 키워드
   * @param blogId - 대상 블로그 ID
   * @returns 실제 검색 순위 데이터
   */
  async getActualSearchRanking(keyword: string, blogId: string) {
    try {
      console.log(`🔍 실제 검색 순위 확인: "${keyword}" -> ${blogId}`);
      
      const searchUrl = `https://search.naver.com/search.naver?where=blog&query=${encodeURIComponent(keyword)}`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.9'
        }
      });

      if (!response.ok) {
        throw new Error(`검색 실패: ${response.status}`);
      }

      const html = await response.text();
      return this.parseSearchResults(html, blogId, keyword);
      
    } catch (error) {
      console.error(`검색 순위 확인 실패 (${keyword}):`, error);
      return null;
    }
  }

  // 데이터 파싱 메서드들
  private parseStatsData(data: any, blogId: string) {
    // API 응답 데이터 파싱
    return {
      blogId,
      subscriberCount: data.subscriberCount || data.followerCount || 0,
      postCount: data.postCount || data.totalPosts || 0,
      totalViews: data.totalViews || data.totalVisits || 0,
      todayViews: data.todayViews || data.dailyVisits || 0,
      scrapCount: data.scrapCount || 0,
      category: data.category || '주제 없음',
      isReal: true
    };
  }

  private parseRSSData(rssText: string, blogId: string) {
    // RSS XML 파싱으로 실제 데이터 추출
    const titleMatch = rssText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
    const itemMatches = rssText.match(/<item>/g);
    
    const nickname = titleMatch ? 
      titleMatch[1].replace(/의 블로그$/, '').replace(/님의 블로그$/, '') : 
      blogId;

    return {
      blogId,
      nickname,
      postCount: itemMatches ? itemMatches.length : 0,
      category: this.extractCategoryFromRSS(rssText),
      isReal: true,
      dataSource: 'RSS'
    };
  }

  private parsePostListHTML(html: string, blogId: string) {
    // HTML에서 실제 포스트 목록 추출
    const posts: any[] = [];
    
    // 다양한 네이버 블로그 구조 대응
    const postPatterns = [
      /<a[^>]*href="[^"]*PostView\.naver\?blogId=[^"]*logNo=(\d+)[^"]*"[^>]*>([^<]+)<\/a>/g,
      /<div[^>]*class="[^"]*title[^"]*"[^>]*>.*?<a[^>]*href="[^"]*logNo=(\d+)[^"]*"[^>]*>([^<]+)<\/a>/g,
      /<span[^>]*class="[^"]*se_title[^"]*"[^>]*>([^<]+)<\/span>/g
    ];

    postPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        if (match[1] && match[2]) {
          posts.push({
            logNo: match[1],
            title: match[2].trim(),
            url: `https://blog.naver.com/PostView.naver?blogId=${blogId}&logNo=${match[1]}`,
            isReal: true
          });
        }
      }
    });

    return posts.slice(0, 20); // 최대 20개
  }

  private async getPostsFromRSS(blogId: string) {
    try {
      const rssUrl = `https://rss.blog.naver.com/${blogId}.xml`;
      const response = await fetch(rssUrl);
      const rssText = await response.text();
      
      const posts: any[] = [];
      const itemPattern = /<item>(.*?)<\/item>/gs;
      let match;
      
      while ((match = itemPattern.exec(rssText)) !== null) {
        const item = match[1];
        const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
        
        if (titleMatch && linkMatch) {
          const logNoMatch = linkMatch[1].match(/logNo=(\d+)/);
          
          posts.push({
            title: titleMatch[1],
            url: linkMatch[1],
            logNo: logNoMatch ? logNoMatch[1] : null,
            publishDate: pubDateMatch ? new Date(pubDateMatch[1]) : new Date(),
            isReal: true,
            dataSource: 'RSS'
          });
        }
      }
      
      return posts.slice(0, 20);
      
    } catch (error) {
      console.error('RSS 포스트 추출 실패:', error);
      return [];
    }
  }

  private parsePostStatsHTML(html: string, blogId: string, logNo: string) {
    // 포스트 HTML에서 조회수, 댓글 수 등 추출
    const viewCountMatch = html.match(/조회\s*(\d+)/);
    const commentCountMatch = html.match(/댓글\s*(\d+)/);
    const likeCountMatch = html.match(/좋아요\s*(\d+)/);
    
    return {
      blogId,
      logNo,
      viewCount: viewCountMatch ? parseInt(viewCountMatch[1]) : 0,
      commentCount: commentCountMatch ? parseInt(commentCountMatch[1]) : 0,
      likeCount: likeCountMatch ? parseInt(likeCountMatch[1]) : 0,
      isReal: true
    };
  }

  private parseSearchResults(html: string, targetBlogId: string, keyword: string) {
    // 검색 결과에서 해당 블로그의 순위 찾기
    const blogPattern = new RegExp(`blog\\.naver\\.com\\/PostView\\.naver\\?blogId=${targetBlogId}&logNo=(\\d+)`, 'g');
    const matches = [];
    let match;
    let position = 1;
    
    // 검색 결과를 순차적으로 확인
    const resultPattern = /<div[^>]*class="[^"]*total_area[^"]*"[^>]*>.*?<\/div>/gs;
    let resultMatch;
    
    while ((resultMatch = resultPattern.exec(html)) !== null) {
      if (blogPattern.test(resultMatch[0])) {
        matches.push({
          keyword,
          blogId: targetBlogId,
          rank: position,
          isReal: true
        });
      }
      position++;
    }
    
    return matches;
  }

  private extractCategoryFromRSS(rssText: string): string {
    // RSS에서 카테고리 추출 시도
    const categoryMatch = rssText.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/);
    if (categoryMatch) {
      return categoryMatch[1];
    }
    
    // 포스트 제목들로 카테고리 추정
    const titleMatches = rssText.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/g) || [];
    const allTitles = titleMatches.join(' ').toLowerCase();
    
    const categoryKeywords = {
      '맛집': ['맛집', '음식', '레시피', '요리', '카페'],
      '여행': ['여행', '관광', '호텔', '축제'],
      'IT·컴퓨터': ['프로그래밍', '코딩', '개발', '앱'],
      '패션·미용': ['패션', '뷰티', '화장품', '스타일'],
      '건강·의학': ['건강', '운동', '의학', '다이어트'],
      '교육·학문': ['교육', '학습', '공부', '책'],
      '취미·게임': ['게임', '취미', '만화', '영화']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => allTitles.includes(keyword))) {
        return category;
      }
    }

    return '일상·생각';
  }
}

// 전역 인스턴스
export const naverBlogAPI = new NaverBlogAPIClient();
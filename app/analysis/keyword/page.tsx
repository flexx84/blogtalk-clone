'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KeywordAnalysisPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/member/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleAnalysis = async () => {
    if (!keyword.trim()) {
      alert('분석할 키워드를 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    
    // 실제 분석 API 호출 시뮬레이션
    setTimeout(() => {
      const mockResult = {
        keyword: keyword,
        category: category,
        searchVolume: {
          monthly: 12500,
          trend: '+15%',
          difficulty: 'medium'
        },
        relatedKeywords: [
          { keyword: `${keyword} 추천`, volume: 8900, difficulty: 'low' },
          { keyword: `${keyword} 방법`, volume: 6400, difficulty: 'medium' },
          { keyword: `${keyword} 순위`, volume: 4200, difficulty: 'high' },
          { keyword: `${keyword} 후기`, volume: 3800, difficulty: 'low' },
          { keyword: `${keyword} 비교`, volume: 2900, difficulty: 'medium' }
        ],
        trendData: [
          { month: '1월', volume: 10200 },
          { month: '2월', volume: 11800 },
          { month: '3월', volume: 12500 },
          { month: '4월', volume: 11200 },
          { month: '5월', volume: 13400 }
        ],
        competitionAnalysis: {
          topPosts: [
            { title: `${keyword} 완벽 가이드`, url: 'blog1.com', views: 25000, rank: 1 },
            { title: `초보자를 위한 ${keyword} 팁`, url: 'blog2.com', views: 18000, rank: 2 },
            { title: `${keyword} 실전 경험담`, url: 'blog3.com', views: 15000, rank: 3 }
          ]
        },
        recommendations: [
          `"${keyword} 초보자"와 같은 롱테일 키워드를 활용하세요`,
          '경쟁이 낮은 관련 키워드로 시작해보세요',
          '계절성을 고려한 콘텐츠 전략을 수립하세요'
        ]
      };
      
      setAnalysisResult(mockResult);
      setShowResults(true);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">키워드 분석</h1>
          <p className="text-gray-600">
            키워드를 입력하시면 검색량, 경쟁도, 관련 키워드 등 상세한 분석 결과를 제공해드립니다.
          </p>
        </div>

        {/* Analysis Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">키워드 분석</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                분석할 키워드
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="예: 요리, 여행, 독서"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              >
                <option value="all">전체</option>
                <option value="lifestyle">라이프스타일</option>
                <option value="food">음식</option>
                <option value="travel">여행</option>
                <option value="fashion">패션</option>
                <option value="tech">기술</option>
                <option value="health">건강</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing || !keyword.trim()}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                분석 중...
              </>
            ) : (
              '키워드 분석 시작'
            )}
          </button>

          {/* Usage Info */}
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-1">이용 안내</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 현재 플랜: {user.membershipPlan === 'basic' ? '베이직' : user.membershipPlan === 'standard' ? '스탠다드' : '무료'}</li>
                  <li>• 일일 분석 한도: {user.membershipPlan === 'basic' ? '100회' : user.membershipPlan === 'standard' ? '200회' : '0회'}</li>
                  <li>• 오늘 사용량: 0회</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {showResults && analysisResult && (
          <div className="space-y-6">
            {/* Search Volume & Trend */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">검색량 분석</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {analysisResult.searchVolume.monthly.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">월 평균 검색량</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {analysisResult.searchVolume.trend}
                  </div>
                  <div className="text-sm text-gray-600">전월 대비 증가율</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-1 capitalize">
                    {analysisResult.searchVolume.difficulty}
                  </div>
                  <div className="text-sm text-gray-600">경쟁 난이도</div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">검색량 추이</h2>
              <div className="space-y-4">
                {analysisResult.trendData.map((data, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600">{data.month}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-600 h-4 rounded-full" 
                          style={{width: `${(data.volume / 15000) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="w-20 text-sm text-gray-600 text-right">
                      {data.volume.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Keywords */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">연관 키워드</h2>
              <div className="space-y-3">
                {analysisResult.relatedKeywords.map((related, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{related.keyword}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">
                          검색량: {related.volume.toLocaleString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          related.difficulty === 'low' ? 'bg-green-100 text-green-800' :
                          related.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {related.difficulty === 'low' ? '낮음' : 
                           related.difficulty === 'medium' ? '보통' : '높음'}
                        </span>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      저장
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Competition Analysis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">경쟁 분석</h2>
              <div className="space-y-4">
                {analysisResult.competitionAnalysis.topPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{post.rank}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{post.views.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">조회수</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">전략 제안</h2>
              <div className="space-y-3">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
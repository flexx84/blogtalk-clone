'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function InfluencerAnalysisPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
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
    if (user.membershipPlan !== 'standard') {
      alert('인플루언서 분석은 스탠다드 플랜 이상에서 이용할 수 있습니다.');
      return;
    }

    setIsAnalyzing(true);
    
    // 실제 분석 API 호출 시뮬레이션
    setTimeout(() => {
      const mockResult = {
        category: category,
        totalInfluencers: 156,
        topInfluencers: [
          {
            id: 1,
            name: '여행러버_지니',
            followers: 245000,
            engagementRate: 8.5,
            avgViews: 35000,
            category: '여행',
            recentGrowth: '+12%',
            blogUrl: 'blog.naver.com/travellover_genie'
          },
          {
            id: 2,
            name: '요리하는남자',
            followers: 189000,
            engagementRate: 9.2,
            avgViews: 28000,
            category: '요리',
            recentGrowth: '+8%',
            blogUrl: 'blog.naver.com/cookingman'
          },
          {
            id: 3,
            name: '패션인사이더',
            followers: 167000,
            engagementRate: 7.8,
            avgViews: 22000,
            category: '패션',
            recentGrowth: '+15%',
            blogUrl: 'blog.naver.com/fashioninsider'
          },
          {
            id: 4,
            name: '라이프스타일_민지',
            followers: 134000,
            engagementRate: 6.9,
            avgViews: 18500,
            category: '라이프스타일',
            recentGrowth: '+5%',
            blogUrl: 'blog.naver.com/lifestyle_minji'
          },
          {
            id: 5,
            name: '북리뷰어_책쟁이',
            followers: 98000,
            engagementRate: 11.3,
            avgViews: 15000,
            category: '도서',
            recentGrowth: '+22%',
            blogUrl: 'blog.naver.com/booklover_reader'
          }
        ],
        trendingTopics: [
          { topic: '봄 여행지', mentions: 1250, growth: '+45%' },
          { topic: '홈카페', mentions: 980, growth: '+32%' },
          { topic: '원룸 인테리어', mentions: 756, growth: '+28%' },
          { topic: '간편 요리', mentions: 623, growth: '+18%' },
          { topic: '운동 루틴', mentions: 445, growth: '+15%' }
        ],
        collaborationOpportunities: [
          {
            influencer: '여행러버_지니',
            type: '협찬 포스팅',
            estimatedCost: '200-300만원',
            expectedReach: '35,000-45,000명'
          },
          {
            influencer: '요리하는남자',
            type: '체험 리뷰',
            estimatedCost: '150-250만원',
            expectedReach: '28,000-38,000명'
          }
        ]
      };
      
      setAnalysisResult(mockResult);
      setShowResults(true);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">인플루언서 분석</h1>
          <p className="text-gray-600">
            카테고리별 인플루언서 현황과 트렌드를 분석하여 협업 기회를 발견하세요.
          </p>
        </div>

        {/* Analysis Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">인플루언서 트렌드 분석</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                분석 카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              >
                <option value="all">전체 카테고리</option>
                <option value="lifestyle">라이프스타일</option>
                <option value="food">음식/요리</option>
                <option value="travel">여행</option>
                <option value="fashion">패션/뷰티</option>
                <option value="tech">기술/IT</option>
                <option value="health">건강/운동</option>
                <option value="books">도서/교육</option>
                <option value="home">인테리어/홈데코</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                키워드 검색 (선택사항)
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="특정 키워드로 검색"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
            </div>
          </div>

          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing || user.membershipPlan !== 'standard'}
            className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              '인플루언서 분석 시작'
            )}
          </button>

          {/* Usage Info */}
          <div className={`mt-4 p-4 border rounded-lg ${
            user.membershipPlan === 'standard' ? 'bg-purple-50 border-purple-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start">
              <svg className={`w-5 h-5 mr-3 mt-0.5 ${
                user.membershipPlan === 'standard' ? 'text-purple-600' : 'text-yellow-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className={`text-sm font-semibold mb-1 ${
                  user.membershipPlan === 'standard' ? 'text-purple-800' : 'text-yellow-800'
                }`}>
                  {user.membershipPlan === 'standard' ? '이용 안내' : '플랜 업그레이드 필요'}
                </h4>
                <ul className={`text-sm space-y-1 ${
                  user.membershipPlan === 'standard' ? 'text-purple-700' : 'text-yellow-700'
                }`}>
                  {user.membershipPlan === 'standard' ? (
                    <>
                      <li>• 현재 플랜: 스탠다드</li>
                      <li>• 일일 분석 한도: 30회</li>
                      <li>• 오늘 사용량: 0회</li>
                    </>
                  ) : (
                    <>
                      <li>• 인플루언서 분석은 스탠다드 플랜에서만 이용 가능합니다</li>
                      <li>• 현재 플랜: {user.membershipPlan === 'basic' ? '베이직' : '무료'}</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {showResults && analysisResult && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">분석 개요</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {analysisResult.totalInfluencers}
                  </div>
                  <div className="text-sm text-gray-600">분석된 인플루언서</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {analysisResult.category === 'all' ? '전체' : analysisResult.category}
                  </div>
                  <div className="text-sm text-gray-600">분석 카테고리</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {analysisResult.trendingTopics.length}
                  </div>
                  <div className="text-sm text-gray-600">트렌딩 토픽</div>
                </div>
              </div>
            </div>

            {/* Top Influencers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">상위 인플루언서</h2>
              <div className="space-y-4">
                {analysisResult.topInfluencers.map((influencer, index) => (
                  <div key={influencer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{influencer.name}</h3>
                        <p className="text-sm text-gray-600">{influencer.blogUrl}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {influencer.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            influencer.recentGrowth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {influencer.recentGrowth}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">
                            {influencer.followers.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">팔로워</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">
                            {influencer.engagementRate}%
                          </div>
                          <div className="text-xs text-gray-600">참여율</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {influencer.avgViews.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">평균 조회수</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">트렌딩 토픽</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResult.trendingTopics.map((topic, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">#{topic.topic}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {topic.growth}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      언급 횟수: {topic.mentions.toLocaleString()}회
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">협업 기회</h2>
              <div className="space-y-4">
                {analysisResult.collaborationOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{opportunity.influencer}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {opportunity.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">예상 비용:</span>
                        <span className="ml-2 font-medium text-gray-900">{opportunity.estimatedCost}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">예상 도달:</span>
                        <span className="ml-2 font-medium text-gray-900">{opportunity.expectedReach}</span>
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      협업 문의하기
                    </button>
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
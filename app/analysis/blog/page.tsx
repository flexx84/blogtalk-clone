'use client';

import { useState } from 'react';
import { Search, TrendingUp, Users, FileText, Target, BarChart3, ArrowUp, ArrowDown, Clock, Eye, MessageCircle, Heart, Star, Award, Calendar, Image, Video, Zap, ExternalLink, BarChart, LineChart, PieChart, Activity, Globe, Bookmark, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function BlogAnalysisPage() {
  const [blogUrl, setBlogUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('latest-ranking');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDialog, setShowPostDialog] = useState(false);

  const handleAnalysis = async () => {
    if (!blogUrl.trim()) {
      alert('블로그 URL을 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analysis/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          blogUrl: blogUrl.trim(),
          userPlan: 'standard',
          todayUsage: 0
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '분석 중 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      if (data.success) {
        setAnalysisResult(data.result);
        setShowResults(true);
      } else {
        throw new Error(data.error || '분석 결과를 가져올 수 없습니다.');
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert(error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setShowPostDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">Insight N</h1>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">블로그 채널 분석</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">키워드 분석</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">인플루언서 분석</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Analysis Input */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">블로그 분석</h1>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="블로그 URL을 입력하세요 (예: https://blog.naver.com/example)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              />
            </div>
            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing || !blogUrl.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  분석 중...
                </>
              ) : (
                '분석 시작'
              )}
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-blue-600 mr-3 mt-0.5">ℹ️</div>
              <div>
                <h4 className="text-sm font-semibold text-blue-800 mb-1">이용 안내</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 네이버 블로그 URL을 입력하시면 상세한 분석 결과를 제공합니다</li>
                  <li>• 실시간 크롤링을 통한 정확한 데이터 분석</li>
                  <li>• blogtalk.io와 동일한 분석 결과 제공</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results - blogtalk.io 스타일 */}
        {showResults && analysisResult && (
          <div className="space-y-6">
            {/* 블로그 지수 헤더 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 블로그 지수 카드 - blogtalk.io 스타일 */}
              <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    블로그 지수
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-blue-600">
                        {analysisResult.blogIndex?.grade || '분석 중'}
                      </div>
                      <div className="text-sm text-gray-600">
                        베이스 점수<br/>
                        <span className="text-lg font-semibold text-gray-900">
                          {analysisResult.blogIndex?.baseScore?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">유효 키워드</div>
                      <div className="text-2xl font-bold text-green-600">
                        {analysisResult.metrics?.validKeywordCount || 0}개
                      </div>
                    </div>
                  </div>
                  
                  {/* 진행률 바 */}
                  <div className="bg-gray-100 rounded-full h-3 mb-2">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(100, analysisResult.blogIndex?.progressToNext || 0)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    다음 등급까지 {(100 - (analysisResult.blogIndex?.progressToNext || 0)).toFixed(1)}% 남음
                  </div>
                </CardContent>
              </Card>

              {/* 총 게시물 카드 */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    총 게시물
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">전체 포스트</span>
                      <span className="text-lg font-semibold">
                        {analysisResult.blogInfo?.postCount?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">구독자 수</span>
                      <span className="text-lg font-semibold">
                        {analysisResult.blogInfo?.subscriberCount?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">스크랩 수</span>
                      <span className="text-lg font-semibold">
                        {analysisResult.blogInfo?.scrapCount?.toLocaleString() || '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 탭 네비게이션 및 콘텐츠 - blogtalk.io 스타일 */}
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-gray-200 px-6 pt-4">
                    <TabsList className="grid w-full grid-cols-6 mb-4 bg-transparent h-auto p-0">
                      <TabsTrigger 
                        value="latest-ranking" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        최신 순위/블로그 정보
                      </TabsTrigger>
                      <TabsTrigger 
                        value="visitor-stats" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        방문자 수 지표
                      </TabsTrigger>
                      <TabsTrigger 
                        value="ranking" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        전체 순위/주제 순위
                      </TabsTrigger>
                      <TabsTrigger 
                        value="keywords" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        유효키워드
                      </TabsTrigger>
                      <TabsTrigger 
                        value="recent-posts" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        최근 포스팅
                      </TabsTrigger>
                      <TabsTrigger 
                        value="popular-posts" 
                        className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-b-2 border-transparent hover:border-gray-300 pb-2 text-sm"
                      >
                        인기글 목록
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="latest-ranking" className="p-6">
                    {/* 3차원 분석 점수 - blogtalk.io 스타일 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-700">전문성</span>
                            </div>
                            <Badge variant="default" className="text-xs">
                              {analysisResult.scoreComparison?.expertise?.evaluation || '분석 중'}
                            </Badge>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {analysisResult.blogScore?.expertise?.toFixed(2) || '0.00'}
                            </span>
                            <span className="text-sm text-gray-500">/ 100</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            카테고리 평균 {analysisResult.scoreComparison?.expertise?.categoryAverage?.toFixed(2) || '0.00'}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-gray-700">신뢰성</span>
                            </div>
                            <Badge variant="default" className="text-xs">
                              {analysisResult.scoreComparison?.trust?.evaluation || '분석 중'}
                            </Badge>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {analysisResult.blogScore?.trust?.toFixed(2) || '0.00'}
                            </span>
                            <span className="text-sm text-gray-500">/ 100</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            카테고리 평균 {analysisResult.scoreComparison?.trust?.categoryAverage?.toFixed(2) || '0.00'}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-orange-500" />
                              <span className="text-sm font-medium text-gray-700">관련성</span>
                            </div>
                            <Badge variant="default" className="text-xs">
                              {analysisResult.scoreComparison?.relevance?.evaluation || '분석 중'}
                            </Badge>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {analysisResult.blogScore?.relevance?.toFixed(2) || '0.00'}
                            </span>
                            <span className="text-sm text-gray-500">/ 100</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            카테고리 평균 {analysisResult.scoreComparison?.relevance?.categoryAverage?.toFixed(2) || '0.00'}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* 블로그 정보 상세 */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">블로그 정보</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-1">
                              {analysisResult.blogInfo?.postCount?.toLocaleString() || '0'}
                            </div>
                            <div className="text-sm text-gray-600">총 포스트</div>
                          </div>
                          <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {analysisResult.blogInfo?.subscriberCount?.toLocaleString() || '0'}
                            </div>
                            <div className="text-sm text-gray-600">구독자</div>
                          </div>
                          <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600 mb-1">
                              {analysisResult.blogInfo?.averageViews?.toLocaleString() || '0'}
                            </div>
                            <div className="text-sm text-gray-600">평균 조회수</div>
                          </div>
                          <div className="text-center p-4 border border-gray-200 rounded-lg">
                            <div className="text-xl font-bold text-orange-600 mb-1">
                              {analysisResult.blogInfo?.category || '분석 중'}
                            </div>
                            <div className="text-sm text-gray-600">카테고리</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="visitor-stats" className="p-6">
                    <div className="text-center py-12">
                      <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">데이터를 불러올 수 없어요.</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        5월 20일부터, 블로그에 방문자 그래프 위젯을<br />
                        추가하지 않은 블로그는 방문자 지표를 열람할 수 없어요.
                      </p>
                      <p className="text-sm text-gray-600">관련해서 대응책을 준비중이니 조금만 기다려주세요 :)</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="ranking" className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart className="w-5 h-5" />
                            전체 순위
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {analysisResult.metrics?.totalRank?.toLocaleString() || '분석 중'}위
                            </div>
                            <div className="text-sm text-gray-600 mb-4">전체 블로그 순위</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Hash className="w-5 h-5" />
                            주제 순위
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {analysisResult.metrics?.categoryRank?.toLocaleString() || '분석 중'}위
                            </div>
                            <div className="text-sm text-gray-600 mb-4">
                              {analysisResult.blogInfo?.category || '분석 중'} 카테고리
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="keywords" className="p-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Hash className="w-5 h-5" />
                          유효 키워드 ({analysisResult.metrics?.validKeywordCount || 0}개)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {(analysisResult.keywords || []).map((keyword: string, index: number) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                              <div className="text-sm font-medium text-gray-900">#{keyword}</div>
                              <div className="text-xs text-gray-500 mt-1">키워드</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="recent-posts" className="p-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          최근 포스팅 분석
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {(analysisResult.recentPosts || []).slice(0, 10).map((post: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handlePostClick(post)}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant={post.exposureStatus === '정상 노출' ? 'default' : 'secondary'} className="text-xs">
                                    {post.exposureStatus || '분석 중'}
                                  </Badge>
                                  <Badge variant={post.grade?.includes('최적') ? 'default' : 'secondary'} className="text-xs">
                                    {post.grade || '분석 중'}
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500">{post.publishTime || '시간 미상'}</span>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">{post.title || '제목 없음'}</h4>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <span>🖼️ {post.imageCount || 0}</span>
                                <span>📝 {post.characterCount?.toLocaleString() || 0}</span>
                                <span>💬 {post.commentCount || 0}</span>
                                <span>👍 {post.likeCount || 0}</span>
                                <span>👁️ {post.viewCount?.toLocaleString() || 0}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="popular-posts" className="p-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          인기글 목록
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {(analysisResult.recentPosts || []).slice(0, 10).map((post: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handlePostClick(post)}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className="text-xs bg-orange-100 text-orange-800">
                                    #{index + 1} 인기글
                                  </Badge>
                                  <Badge variant={post.grade?.includes('최적') ? 'default' : 'secondary'} className="text-xs">
                                    {post.grade || '분석 중'}
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500">{post.publishDate || '날짜 미상'}</span>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">{post.title || '제목 없음'}</h4>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <span>👁️ {post.viewCount?.toLocaleString() || 0}</span>
                                <span>💬 {post.commentCount || 0}</span>
                                <span>👍 {post.likeCount || 0}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 포스트 상세 분석 다이얼로그 */}
        <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                포스팅 상세 분석
              </DialogTitle>
            </DialogHeader>
            {selectedPost && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedPost.title || '제목 없음'}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>발행: {selectedPost.publishDate || '날짜 미상'}</span>
                    <Badge variant={selectedPost.exposureStatus === '정상 노출' ? 'default' : 'secondary'}>
                      {selectedPost.exposureStatus || '분석 중'}
                    </Badge>
                    <Badge variant={selectedPost.grade?.includes('최적') ? 'default' : 'secondary'}>
                      {selectedPost.grade || '분석 중'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedPost.imageCount || 0}</div>
                    <div className="text-sm text-gray-600">이미지</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedPost.characterCount?.toLocaleString() || 0}</div>
                    <div className="text-sm text-gray-600">글자수</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedPost.commentCount || 0}</div>
                    <div className="text-sm text-gray-600">댓글</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{selectedPost.viewCount?.toLocaleString() || 0}</div>
                    <div className="text-sm text-gray-600">조회수</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">3차원 점수 분석</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">전문성</span>
                        <span className="text-sm font-bold">{selectedPost.scores?.expertise || 0}</span>
                      </div>
                      <Progress value={selectedPost.scores?.expertise || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">신뢰성</span>
                        <span className="text-sm font-bold">{selectedPost.scores?.trust || 0}</span>
                      </div>
                      <Progress value={selectedPost.scores?.trust || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">관련성</span>
                        <span className="text-sm font-bold">{selectedPost.scores?.relevance || 0}</span>
                      </div>
                      <Progress value={selectedPost.scores?.relevance || 0} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowPostDialog(false)}>
                    닫기
                  </Button>
                  <Button onClick={() => selectedPost.link && window.open(selectedPost.link, '_blank')}>
                    원본 보기
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">회사 정보</h3>
              <p className="text-gray-300 text-sm">회사명: 인사이트 엔</p>
              <p className="text-gray-300 text-sm">대표자: 김수한</p>
              <p className="text-gray-300 text-sm">주소: 서울시 강남길 계헤란로 7611호</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">고객센터</h3>
              <p className="text-gray-300 text-sm">전화번호: 02-123-4567</p>
              <p className="text-gray-300 text-sm">이메일: info@example.com</p>
              <p className="text-gray-300 text-sm">운영시간: 평일 09:00-18:00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <p className="text-gray-300 text-sm">사업자등록번호: 123-45-67890</p>
              <p className="text-gray-300 text-sm">통신판매업신고번호: 2025-서울강남-0207</p>
              <p className="text-gray-300 text-sm">개인정보보호책임자: 개인정보팀</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">이용약관</h3>
              <p className="text-gray-300 text-sm">개인정보처리방침</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 인사이트 엔. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
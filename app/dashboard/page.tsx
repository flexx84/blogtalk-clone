'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                안녕하세요, {user.name}님! 👋
              </h1>
              <p className="text-gray-600">
                현재 {user.membershipPlan === 'basic' ? '베이직' : user.membershipPlan === 'standard' ? '스탠다드' : '무료'} 플랜을 이용 중입니다.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">이메일</div>
              <div className="font-semibold">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 블로그 채널 분석 */}
          <Link href="/analysis/blog" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer block">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">블로그 채널 분석</h3>
                <p className="text-gray-600 text-sm">블로그 지수와 성과를 분석해보세요</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {user.membershipPlan !== 'free' ? '이용 가능' : '멤버십 가입 필요'}
            </div>
          </Link>

          {/* 키워드 분석 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">키워드 분석</h3>
                <p className="text-gray-600 text-sm">맞춤형 키워드를 추천받아보세요</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {user.membershipPlan !== 'free' ? `일 ${user.membershipPlan === 'standard' ? '200' : '100'}회 이용 가능` : '멤버십 가입 필요'}
            </div>
          </div>

          {/* 인플루언서 분석 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">인플루언서 분석</h3>
                <p className="text-gray-600 text-sm">인플루언서 채널과 트렌드를 분석하세요</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {user.membershipPlan === 'standard' ? '일 30회 이용 가능' : '스탠다드 플랜 필요'}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">이용 현황</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
              <div className="text-sm text-gray-600">오늘 블로그 분석</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">0</div>
              <div className="text-sm text-gray-600">오늘 키워드 분석</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">0</div>
              <div className="text-sm text-gray-600">저장된 키워드</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {user.membershipPlan === 'basic' ? '50' : user.membershipPlan === 'standard' ? '100' : '0'}
              </div>
              <div className="text-sm text-gray-600">일일 분석 한도</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
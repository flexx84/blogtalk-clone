'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="블톡 플래너"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link href="/analysis/blog" className="flex items-center text-gray-700 hover:text-gray-900">
                블로그 채널 분석
              </Link>
            </div>
            <div className="relative group">
              <Link href="/analysis/keyword" className="flex items-center text-gray-700 hover:text-gray-900">
                키워드 분석
              </Link>
            </div>
            <div className="relative group">
              <Link href="/analysis/influencer" className="flex items-center text-gray-700 hover:text-gray-900">
                인플루언서
              </Link>
            </div>
          </nav>

          {/* Right side menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/membership"
              className="text-gray-700 hover:text-gray-900"
            >
              멤버십
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  대시보드
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{user.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {user.membershipPlan === 'basic' ? '베이직' : user.membershipPlan === 'standard' ? '스탠다드' : '무료'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/member/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                로그인/가입
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/analysis/blog" className="text-left text-gray-700">블로그 채널 분석</Link>
              <Link href="/analysis/keyword" className="text-left text-gray-700">키워드 분석</Link>
              <Link href="/analysis/influencer" className="text-left text-gray-700">인플루언서</Link>
              <Link href="/membership" className="text-gray-700">
                멤버십
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/dashboard" className="text-gray-700">대시보드</Link>
                  <button onClick={logout} className="text-left text-gray-700">로그아웃</button>
                </div>
              ) : (
                <Link href="/member/login" className="text-blue-600">
                  로그인/가입
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
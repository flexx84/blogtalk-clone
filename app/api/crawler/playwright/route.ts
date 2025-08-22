// Playwright를 이용한 실시간 블로그 크롤링 API
import { NextRequest, NextResponse } from 'next/server';
import { crawlBlogWithPlaywright } from '@/lib/playwright-crawler';

export async function POST(request: NextRequest) {
  try {
    const { blogId, options = {} } = await request.json();
    
    if (!blogId) {
      return NextResponse.json(
        { error: '블로그 ID가 필요합니다.' },
        { status: 400 }
      );
    }
    
    console.log(`Playwright 크롤링 시작: ${blogId}`);
    
    // Playwright를 이용한 실시간 크롤링
    const result = await crawlBlogWithPlaywright(blogId, {
      headless: true,
      timeout: 45000, // 상용화를 위해 더 긴 타임아웃
      ...options
    });
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || '크롤링 실패' },
        { status: 500 }
      );
    }
    
    console.log(`Playwright 크롤링 완료: ${blogId}, 포스트 ${result.posts?.length || 0}개`);
    
    return NextResponse.json({
      success: true,
      data: result.data,
      posts: result.posts,
      method: 'playwright',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Playwright API 오류:', error);
    return NextResponse.json(
      { 
        error: 'Playwright 크롤링 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// 크롤링 상태 확인
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const test = url.searchParams.get('test');
    
    if (test === 'true') {
      // Playwright 설치 및 기능 테스트
      try {
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({ headless: true });
        await browser.close();
        
        return NextResponse.json({
          status: 'ready',
          message: 'Playwright가 정상적으로 설치되어 있습니다.',
          capabilities: ['chromium', 'real-time-crawling', 'javascript-execution']
        });
      } catch (error) {
        return NextResponse.json({
          status: 'error',
          message: 'Playwright 설치가 필요합니다.',
          error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({
      status: 'available',
      description: '실시간 블로그 크롤링 API',
      endpoints: {
        'POST /api/crawler/playwright': '실시간 크롤링 실행',
        'GET /api/crawler/playwright?test=true': 'Playwright 상태 확인'
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: '상태 확인 중 오류 발생' },
      { status: 500 }
    );
  }
}
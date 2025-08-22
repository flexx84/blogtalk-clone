import { NextRequest, NextResponse } from 'next/server';
import { analyzeBlog } from '@/lib/blog-analysis';
import { generateEnhancedMockData, generateRealisticPostData } from '@/lib/blog-crawler';

export async function GET() {
  try {
    console.log('=== 현실적인 점수 체계 테스트 시작 ===');
    
    // Test data for realistic scoring
    const testBlogId = 'testblog123';
    const blogData = generateEnhancedMockData(testBlogId);
    const posts = generateRealisticPostData(testBlogId, 15);
    
    console.log('블로그 정보:', {
      blogId: blogData.blogId,
      category: blogData.category,
      postCount: blogData.postCount,
      subscriberCount: blogData.subscriberCount
    });
    
    // Run analysis with our updated realistic scoring
    const analysisResult = await analyzeBlog(blogData, posts);
    
    console.log('=== 분석 결과 ===');
    console.log('전문성 점수:', analysisResult.expertiseScore);
    console.log('신뢰성 점수:', analysisResult.trustScore);
    console.log('관련성 점수:', analysisResult.relevanceScore);
    console.log('종합 점수:', analysisResult.overallScore);
    console.log('블로그 지수:', analysisResult.blogIndex);
    
    // Validation of realistic scores
    const validation = {
      expertiseRealistic: analysisResult.expertiseScore >= 15 && analysisResult.expertiseScore <= 85,
      trustRealistic: analysisResult.trustScore >= 10 && analysisResult.trustScore <= 80,
      relevanceRealistic: analysisResult.relevanceScore >= 20 && analysisResult.relevanceScore <= 85,
      overallRealistic: analysisResult.overallScore >= 20 && analysisResult.overallScore <= 85,
      gradeRealistic: analysisResult.blogIndex !== '최적 1' // Should not be perfect score
    };
    
    const allRealistic = Object.values(validation).every(v => v === true);
    
    return NextResponse.json({
      success: true,
      message: allRealistic ? '✅ 현실적인 점수 체계가 올바르게 작동합니다!' : '⚠️ 일부 점수가 비현실적입니다.',
      testResults: {
        blogData,
        analysisResult,
        validation,
        allRealistic,
        comparison: {
          beforeFix: '이전에는 전문성 100.00, 신뢰성 100.00, 관련성 100.00으로 비현실적이었음',
          afterFix: `현재 전문성 ${analysisResult.expertiseScore}, 신뢰성 ${analysisResult.trustScore}, 관련성 ${analysisResult.relevanceScore}로 현실적 범위`
        }
      }
    });
    
  } catch (error) {
    console.error('Test scoring error:', error);
    return NextResponse.json({
      success: false,
      error: 'Testing failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      details: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
}
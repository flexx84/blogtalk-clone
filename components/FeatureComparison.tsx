import React from 'react';

const FeatureComparison = () => {
  const features = [
    {
      category: "일반",
      items: [
        {
          name: "동시 로그인 기기",
          free: "1대",
          basic: "1대",
          standard: "1대"
        }
      ]
    },
    {
      category: "블로그 지수",
      items: [
        {
          name: "내 블로그 지수 분석",
          free: "❌",
          basic: "무제한",
          standard: "무제한"
        },
        {
          name: "타 블로그 지수 분석",
          free: "❌",
          basic: "일 50회",
          standard: "일 100회"
        },
        {
          name: "유효 키워드 리스트 제공",
          free: "❌",
          basic: "✅",
          standard: "✅"
        },
        {
          name: "블로그 포스팅 진단(도입 예정)",
          free: "❌",
          basic: "일 20회",
          standard: "일 40회"
        }
      ]
    },
    {
      category: "키워드 분석",
      items: [
        {
          name: "맞춤형 키워드 분석",
          free: "❌",
          basic: "일 100회",
          standard: "일 200회"
        },
        {
          name: "키워드 추천 한도",
          free: "❌",
          basic: "일 최대 90개",
          standard: "일 최대 150개"
        },
        {
          name: "맞춤형 키워드 리스트",
          free: "❌",
          basic: "✅",
          standard: "✅"
        }
      ]
    },
    {
      category: "키워드 순위 모니터링",
      items: [
        {
          name: "실시간 순위 분석",
          free: "❌",
          basic: "일 30회",
          standard: "일 60회"
        },
        {
          name: "순위 모니터링 저장",
          free: "❌",
          basic: "최대 20개",
          standard: "최대 50개"
        }
      ]
    },
    {
      category: "인플루언서",
      items: [
        {
          name: "인플루언서 전용 키워드챌린지 플래너",
          free: "❌",
          basic: "❌",
          standard: "✅"
        },
        {
          name: "인플루언서 채널 분석",
          free: "❌",
          basic: "❌",
          standard: "일 30회"
        },
        {
          name: "인플루언서 리스트",
          free: "❌",
          basic: "❌",
          standard: "✅"
        }
      ]
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">플랜별 기능 비교</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left font-semibold text-gray-900">제공 기능</th>
              <th className="p-4 text-center font-semibold text-gray-900">무료 회원</th>
              <th className="p-4 text-center font-semibold text-gray-900">베이직</th>
              <th className="p-4 text-center font-semibold text-gray-900">스탠다드</th>
            </tr>
          </thead>
          <tbody>
            {features.map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className="bg-blue-50">
                  <td colSpan={4} className="p-4 font-semibold text-blue-900">
                    {category.category}
                  </td>
                </tr>
                {category.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{item.name}</td>
                    <td className="p-4 text-center text-gray-600">{item.free}</td>
                    <td className="p-4 text-center text-gray-900">{item.basic}</td>
                    <td className="p-4 text-center text-gray-900">{item.standard}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;
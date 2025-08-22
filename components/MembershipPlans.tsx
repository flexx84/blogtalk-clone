const MembershipPlans = () => {
  const plans = [
    {
      name: "베이직",
      originalPrice: "₩50,000",
      discountedPrice: "25,000",
      period: "/30일",
      description: "블로그 지수 확인, 스마트블록까지 점령하겠어!",
      details: "개인 / 사업자 / 브랜드 블로그 대상 플랜\n블로그 지수 상세 분석과 맞춤형 키워드 추천까지",
      buttonText: "구독하기",
      isPopular: false
    },
    {
      name: "스탠다드",
      originalPrice: "₩90,000",
      discountedPrice: "45,000",
      period: "/30일",
      description: "치트키 모두 모엿! 쑥쑥 올라가는 인플 순위",
      details: "네이버 인플루언서, 예비 인플을 위한 올인원 플랜\n즉시 활용하는 인플루언서 관련 폭넓은 인사이트",
      buttonText: "구독하기",
      isPopular: true
    }
  ];

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg p-8 shadow-lg border-2 ${
              plan.isPopular ? 'border-blue-500 relative' : 'border-gray-200'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  추천
                </span>
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
            
            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 line-through mb-1">
                {plan.originalPrice}{plan.period}
              </div>
              <div className="flex items-baseline justify-center">
                <span className="text-sm text-gray-600">₩</span>
                <span className="text-4xl font-bold text-gray-900">{plan.discountedPrice}</span>
                <span className="text-sm text-gray-600">{plan.period}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-center mb-4 text-gray-900">
                {plan.description}
              </p>
              <p className="text-sm text-gray-600 text-center whitespace-pre-line">
                {plan.details}
              </p>
            </div>

            {/* Subscribe Button */}
            <button
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                plan.isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Simple Payment Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            {/* Lottie Animation Placeholder */}
            <div className="w-32 h-32 bg-purple-200 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold">애니메이션</span>
            </div>
          </div>
          <div className="flex-2 text-center md:text-left">
            <p className="text-lg mb-2">정기구독이 부담된다면 간편결제를 이용해보세요.</p>
            <p className="text-gray-600 mb-4">1개월부터 12개월까지, 원하는 기간만큼 이용권을 구매할 수 있어요.</p>
            <a
              href="/membership/ticket"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              바로가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
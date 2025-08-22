'use client';

import { useState } from 'react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1); // 두 번째 FAQ가 기본으로 열려있음

  const faqs = [
    {
      question: "블톡 멤버십을 무료로 체험해볼 수 있나요?",
      answer: "네, 가입 후 블로그를 등록하시면 1일 무료체험권을 제공해드립니다."
    },
    {
      question: "멤버십 이용 일수는 언제부터 카운트 돼요?",
      answer: "멤버십 구독과 동시에 시작돼요.\n4월 1일 오후 2시 30분 15초에 결제했다면, 그때부터 카운트 되고, 30일간 유지됩니다.\n3개월/6개월/12개월 단위로 결제했다면 구독 기간은 그만큼 늘어날거에요."
    },
    {
      question: "결제 수단은 어떤 게 있어요?",
      answer: "신용카드, 체크카드, 계좌이체, 무통장입금 등 다양한 결제 수단을 지원합니다."
    },
    {
      question: "환불 가능한가요?",
      answer: "30일 이용권은 결제 후 7일 이내 미사용 시 환불 가능하며, 90일 이상 이용권은 사용 후에도 환불 가능합니다. 단, 남은 일수 기준으로 정산되고 10% 위약금이 발생합니다."
    },
    {
      question: "멤버십 플랜을 변경하고 싶어요.",
      answer: "마이페이지에서 언제든지 플랜을 변경하실 수 있습니다. 업그레이드 시 차액만 결제하시면 됩니다."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">자주 묻는 질문(FAQ)</h2>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openFAQ === index && (
              <div className="px-6 pb-4">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
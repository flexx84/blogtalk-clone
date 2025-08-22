const PaymentInfo = () => {
  const paymentRules = [
    "1. 이용권은 30일 / 90일 / 180일 / 360일 단위로 구매할 수 있습니다.",
    "2. 장기 이용권은 할인 적용 가격으로 제공됩니다.",
    "3. 30일 이용권은 결제 후 7일 이내 미사용 시 환불 가능, 이후 환불 불가입니다.",
    "4. 90일 이상 이용권은 사용 후에도 환불 가능하며, 남은 일수 기준으로 정산되고 10% 위약금이 발생합니다.",
    "5. 정기구독은 결제 즉시 이용권이 자동 활성화됩니다.",
    "6. 간편결제 이용 시, 쿠폰함 > 쿠폰 사용을 눌러서 사용 가능합니다.",
    "7. 모든 요금은 공급가 기준(VAT 별도)입니다.",
    "8. 결제내역은 마이페이지 > 결제내역에서 확인하실 수 있습니다."
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">결제 및 이용안내</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <ul className="space-y-4">
          {paymentRules.map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentInfo;
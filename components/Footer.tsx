import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">블톡 플래너</h4>
            <div className="space-y-2">
              <Link href="/notices" className="block text-gray-300 hover:text-white">
                공지사항
              </Link>
              <a
                href="https://blogtalk.channel.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white"
              >
                고객센터
              </a>
              <a
                href="https://cafe.naver.com/supapa13"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white"
              >
                블톡 카페
              </a>
            </div>
          </div>

          {/* Legal Info */}
          <div>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex">
                <span className="w-20 font-medium">회사명</span>
                <span>주식회사 블톡</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">대표자</span>
                <span>황성원</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">주소</span>
                <span>서울 강서구 마곡중앙6로 161-8 (두산더랜드파크 C동 1011호)</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">사업자등록번호</span>
                <span>429-81-03546</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">통신판매업 신고번호</span>
                <span>2025-서울강서-0207</span>
              </div>
            </div>
            
            <div className="mt-4 space-x-4 text-sm">
              <Link href="/polices" className="text-gray-300 hover:text-white">
                이용약관
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 주식회사 블톡. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            블로거세요?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            네이버 블로그 최적화를 위한 올인원 플랫폼
          </p>
          
          {/* Hero Image Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="w-full h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">블톡 플래너</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
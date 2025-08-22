const VideoSection = () => {
  const videos = [
    {
      title: "네이버 블로그 저품질, 99%가 실패하는 이유 (살리는 법 공개)",
      tags: ["#블로그", "#저품질", "#현시점 가장 필요한"],
      url: "https://youtu.be/cHKc_IOCYKo?si=dCcfr8BIYpaSwozH"
    },
    {
      title: "네이버 블로그, 알고리즘 개혁 터짐! 지수 하락 & 저품질 해결법",
      tags: ["#블로그", "#저폼질", "#블로그지수", "#블로그리포트"],
      url: "https://youtu.be/P07SEASF7OA?si=1-fNv1b8J8JlAZrK"
    },
    {
      title: "수익형 블로그, 결국 돈 버는 사람은 따로 있습니다💰",
      tags: ["#블로그", "#수익화", "#꿀팁"],
      url: "https://youtu.be/O6493p-c-4U?si=2tDGogEstLvqgHUS"
    },
    {
      title: "블로그 키워도 수익 0원? 초보들이 꼭 피해야 할 5가지 실수",
      tags: ["#블로그", "#초보", "#수익화", "#꿀팁"],
      url: "https://youtu.be/g_27MWXb1Xs?si=8rYisDwBvxHM1esx"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">금주의 추천 영상</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Video Thumbnail Placeholder */}
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
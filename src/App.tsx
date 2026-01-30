// import { RouterProvider } from 'react-router-dom';
// import { router } from './route';
export default function App() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-rose-100">
      {/* <RouterProvider router={router} />
      <Toaster /> */}
      
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* 상단 장식 */}
        <div className="h-32 bg-gradient-to-b from-rose-300 to-pink-100 flex items-center justify-center rounded-b-3xl shadow-lg">
          <div className="text-center">
            <p className="text-sm text-rose-600 font-light tracking-wider">Together</p>
            <h1 className="text-4xl font-serif text-rose-700 mt-2">💕</h1>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 px-6 py-8">
          {/* 신부/신랑 정보 */}
          <div className="text-center mb-8">
            <p className="text-rose-600 text-lg font-serif mb-2">
              <span className="font-bold">김병구</span> & <span className="font-bold">박남율</span>
            </p>
            <p className="text-gray-500 text-sm">결혼을 축하해주세요</p>
          </div>

          {/* 사진 영역 */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-pink-200">
            <div className="bg-gradient-to-b from-rose-200 to-pink-200 h-64 flex items-center justify-center">
              {/* 이미지 경로를 여기에 넣으세요. 예: <img src="/path/to/image.jpg" alt="Wedding photo" className="w-full h-full object-cover" /> */}
              <div className="text-center text-gray-500">
                <p className="text-5xl mb-2">📷</p>
                <p className="text-sm">여기에 사진을 넣으세요</p>
              </div>
            </div>
          </div>

          {/* 날짜 카드 */}
          <div className="bg-white rounded-2xl p-8 shadow-md mb-6 text-center border-2 border-pink-200">
            <p className="text-gray-400 text-sm mb-2">Wedding Day</p>
            <p className="text-3xl font-serif text-rose-700 mb-1">2026. 05. 30</p>
            <p className="text-gray-600 text-sm">Saturday 18:00</p>
          </div>

          {/* 장소 정보 */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 border-2 border-pink-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-gray-400 text-xs font-semibold mb-1">LOCATION</p>
                <p className="text-gray-800 font-semibold">코스타드 그랜드</p>
                <p className="text-gray-600 text-sm mt-1">서울 강남구 테헤란로</p>
              </div>
            </div>
          </div>

          {/* 연락처 */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 border-2 border-pink-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs font-semibold mb-2">신랑</p>
                <p className="text-gray-800 font-semibold text-sm">김병구</p>
                <p className="text-rose-600 text-sm font-medium mt-1">010-1234-5678</p>
              </div>
              <div className="text-center border-l border-gray-200">
                <p className="text-gray-400 text-xs font-semibold mb-2">신부</p>
                <p className="text-gray-800 font-semibold text-sm">박남율</p>
                <p className="text-rose-600 text-sm font-medium mt-1">010-8765-4321</p>
              </div>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="space-y-3 mt-8">
            <button className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow">
              💌 축하 메시지 남기기
            </button>
            <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              📱 연락처 저장
            </button>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="text-center py-6 text-gray-400 text-sm">
          <p>Thank you for celebrating with us ♡</p>
        </div>
      </div>
    </main>
  );
}

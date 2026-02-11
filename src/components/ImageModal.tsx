import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: ImageModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  // 스크롤 방지 (현재 위치 유지)
  useEffect(() => {
    // 현재 스크롤 위치 저장
    const scrollY = window.scrollY;
    
    // body를 고정하고 현재 스크롤 위치 유지
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      // 모달 닫을 때 원래 스크롤 위치로 복원
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // 스와이프 핸들러
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold && hasPrevious) {
      onPrevious();
    } else if (info.offset.x < -swipeThreshold && hasNext) {
      onNext();
    }
  };

  const modalContent = (
    <>
      <AnimatePresence>
        {/* Dim 배경 레이어 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0"
          onClick={onClose}
          style={{ 
            zIndex: 9998,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />

        {/* 모달 컨텐츠 레이어 */}
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, pointerEvents: 'none' }}
        >
          {/* 이미지 - 스와이프 가능 */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            className="relative w-full h-full max-w-4xl flex items-center justify-center px-4 cursor-grab active:cursor-grabbing"
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Wedding photo ${currentIndex + 1}`}
              className="max-w-full max-h-[calc(100vh-220px)] object-contain rounded-lg shadow-2xl select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </AnimatePresence>

      {/* UI 컨트롤 레이어 (최상위) - AnimatePresence 밖에 */}
      <div className="fixed inset-0" style={{ zIndex: 10000, pointerEvents: 'none' }}>
        {/* 하단 고정 컨트롤 바 */}
        <div 
          className="absolute bottom-0 left-0 right-0 pb-6 px-4"
          style={{ pointerEvents: 'auto' }}
        >
          <div 
            className="max-w-md mx-auto rounded-full shadow-xl px-3 py-2 flex items-center justify-center gap-3"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* 이전 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              disabled={!hasPrevious}
              className={`rounded-full p-2.5 transition-all ${
                hasPrevious 
                  ? 'text-stone-800 hover:bg-stone-100 active:bg-stone-200' 
                  : 'text-stone-300 cursor-not-allowed'
              }`}
              aria-label="이전 이미지"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* 인디케이터 - 현재 주변만 표시 */}
            <div className="flex items-center justify-center gap-1.5 flex-1">
              {(() => {
                const maxDots = 7; // 최대 표시할 dot 개수
                const totalImages = images.length;
                
                // 이미지가 적으면 모두 표시
                if (totalImages <= maxDots) {
                  return images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        const diff = index - currentIndex;
                        if (diff > 0) {
                          for (let i = 0; i < diff; i++) onNext();
                        } else if (diff < 0) {
                          for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                        }
                      }}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: index === currentIndex ? '32px' : '8px',
                        height: '8px',
                        backgroundColor: index === currentIndex ? '#3b82f6' : '#93c5fd'
                      }}
                      aria-label={`${index + 1}번째 이미지로 이동`}
                    />
                  ));
                }
                
                // 이미지가 많으면 현재 페이지 주변만 표시
                const dots = [];
                const side = Math.floor((maxDots - 1) / 2);
                let start = Math.max(0, currentIndex - side);
                let end = Math.min(totalImages - 1, currentIndex + side);
                
                // 시작이나 끝에서 개수 보정
                if (currentIndex < side) {
                  end = Math.min(totalImages - 1, maxDots - 1);
                } else if (currentIndex > totalImages - side - 1) {
                  start = Math.max(0, totalImages - maxDots);
                }
                
                for (let i = start; i <= end; i++) {
                  dots.push(
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        const diff = i - currentIndex;
                        if (diff > 0) {
                          for (let j = 0; j < diff; j++) onNext();
                        } else if (diff < 0) {
                          for (let j = 0; j < Math.abs(diff); j++) onPrevious();
                        }
                      }}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === currentIndex ? '32px' : '8px',
                        height: '8px',
                        backgroundColor: i === currentIndex ? '#3b82f6' : '#93c5fd'
                      }}
                      aria-label={`${i + 1}번째 이미지로 이동`}
                    />
                  );
                }
                
                return dots;
              })()}
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              disabled={!hasNext}
              className={`rounded-full p-2.5 transition-all ${
                hasNext 
                  ? 'text-stone-800 hover:bg-stone-100 active:bg-stone-200' 
                  : 'text-stone-300 cursor-not-allowed'
              }`}
              aria-label="다음 이미지"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* 구분선 */}
            <div className="w-px h-6 bg-stone-200 mx-1"></div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="rounded-full p-2.5 text-stone-800 hover:bg-stone-100 active:bg-stone-200 transition-all"
              aria-label="닫기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}

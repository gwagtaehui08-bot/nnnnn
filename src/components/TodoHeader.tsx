import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';

interface TodoHeaderProps {
  totalCount: number;      // 전체 할 일 개수
  completedCount: number;  // 완료된 할 일 개수
}

/**
 * TodoHeader 컴포넌트
 * - 애플리케이션의 제목, 오늘 날짜 및 완료 현황 요약을 보여줍니다.
 */
export const TodoHeader: React.FC<TodoHeaderProps> = ({ totalCount, completedCount }) => {
  // 오늘 날짜를 한국어 형식으로 생성 (예: 2026년 9월 17일 목요일)
  const today = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(new Date());

  const remainingCount = totalCount - completedCount;

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <ListTodo className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              할 일 목록
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {today}
          </p>
        </div>

        {/* 진행률 뱃지 */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>
              완료 <strong className="text-emerald-600">{completedCount}</strong> / {totalCount}
            </span>
          </div>
          {totalCount > 0 && (
            <span className="mt-1 text-xs text-slate-500">
              {remainingCount === 0 ? '모든 할 일을 마쳤어요!' : `${remainingCount}개 남음`}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

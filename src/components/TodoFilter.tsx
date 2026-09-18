import React from 'react';
import { FilterType } from '../types';

interface TodoFilterProps {
  currentFilter: FilterType;                          // 현재 선택된 필터 상태
  onFilterChange: (filter: FilterType) => void;        // 필터 변경 시 호출할 함수
  counts: {
    all: number;        // 전체 개수
    active: number;     // 진행 중 개수
    completed: number;  // 완료 개수
  };
}

/**
 * TodoFilter 컴포넌트
 * - "전체", "진행 중", "완료" 목록 필터링 버튼들을 제공합니다.
 * - 각 필터별 항목 개수를 함께 뱃지로 보여줍니다.
 */
export const TodoFilter: React.FC<TodoFilterProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  // 필터 옵션 구성 배열
  const filterOptions: { id: FilterType; label: string; count: number }[] = [
    { id: 'all', label: '전체', count: counts.all },
    { id: 'active', label: '진행 중', count: counts.active },
    { id: 'completed', label: '완료', count: counts.completed },
  ];

  return (
    <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="inline-flex rounded-xl bg-slate-100 p-1">
        {filterOptions.map((option) => {
          const isActive = currentFilter === option.id;
          return (
            <button
              key={option.id}
              id={`filter-${option.id}`}
              type="button"
              onClick={() => onFilterChange(option.id)}
              className={`relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-xs text-slate-400 font-medium hidden sm:inline">
        {counts.all}개의 항목 중 {counts.active}개 남음
      </span>
    </div>
  );
};

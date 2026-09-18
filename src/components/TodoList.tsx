import React from 'react';
import { Todo, FilterType } from '../types';
import { TodoItem } from './TodoItem';
import { ClipboardList, CheckCheck, Clock } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];                                // 필터링이 적용된 할 일 배열
  currentFilter: FilterType;                    // 현재 선택된 필터
  onToggleTodo: (id: number) => void;           // 토글 핸들러 함수
  onDeleteTodo: (id: number) => void;           // 삭제 핸들러 함수
}

/**
 * TodoList 컴포넌트
 * - 전달받은 할 일 목록 배열을 순회하며 TodoItem 컴포넌트들을 렌더링합니다.
 * - 항목이 없을 경우 빈 상태(Empty State)를 적절한 안내 문구와 함께 보여줍니다.
 */
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  currentFilter,
  onToggleTodo,
  onDeleteTodo,
}) => {
  // 목록이 비어있을 때 필터 상태에 따른 안내 메시지 결정
  if (todos.length === 0) {
    let emptyIcon = <ClipboardList className="h-10 w-10 text-slate-300" />;
    let emptyTitle = '등록된 할 일이 없습니다.';
    let emptyDesc = '위 입력창에서 새로운 할 일을 등록해 보세요!';

    if (currentFilter === 'active') {
      emptyIcon = <Clock className="h-10 w-10 text-slate-300" />;
      emptyTitle = '진행 중인 할 일이 없습니다.';
      emptyDesc = '모든 할 일을 마쳤거나 새 할 일을 추가해 보세요.';
    } else if (currentFilter === 'completed') {
      emptyIcon = <CheckCheck className="h-10 w-10 text-slate-300" />;
      emptyTitle = '완료된 할 일이 아직 없습니다.';
      emptyDesc = '할 일을 완료하고 체크박스를 클릭해 보세요!';
    }

    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center">
        <div className="mb-3 rounded-full bg-slate-50 p-3">
          {emptyIcon}
        </div>
        <p className="text-sm font-semibold text-slate-700">{emptyTitle}</p>
        <p className="mt-1 text-xs text-slate-400">{emptyDesc}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {/* 배열의 map 메서드를 사용하여 각 할 일 데이터를 TodoItem 컴포넌트로 변환 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

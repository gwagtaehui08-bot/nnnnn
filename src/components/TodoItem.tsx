import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;                                   // 단일 할 일 데이터 객체
  onToggleTodo: (id: number) => void;           // 완료 여부 토글 함수
  onDeleteTodo: (id: number) => void;           // 할 일 삭제 함수
}

/**
 * TodoItem 컴포넌트
 * - 단일 할 일 항목을 렌더링합니다.
 * - 체크박스를 클릭하면 완료 상태가 토글되고 완료 시 취소선이 표시됩니다.
 * - 삭제 버튼을 누르면 해당 항목이 삭제됩니다.
 */
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
}) => {
  return (
    <li
      id={`todo-item-${todo.id}`}
      className={`group flex items-center justify-between gap-3 rounded-xl border p-3.5 transition-all ${
        todo.completed
          ? 'border-slate-100 bg-slate-50/70'
          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* 체크박스 및 텍스트 영역 (클릭 시 완료 여부 토글) */}
      <div
        onClick={() => onToggleTodo(todo.id)}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 select-none"
      >
        {/* 커스텀 체크박스 UI */}
        <button
          type="button"
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={todo.completed ? '미완료로 변경' : '완료로 변경'}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
            todo.completed
              ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
              : 'border-slate-300 bg-white group-hover:border-slate-400'
          }`}
        >
          {todo.completed && <Check className="h-3.5 w-3.5 stroke-[3]" />}
        </button>

        {/* 할 일 텍스트 내용: 완료 시 line-through(취소선) 스타일 적용 */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm break-words transition-all ${
              todo.completed
                ? 'line-through text-slate-400'
                : 'text-slate-800 font-medium'
            }`}
          >
            {todo.text}
          </p>
          <span className="text-[11px] text-slate-400">
            {todo.createdAt}
          </span>
        </div>
      </div>

      {/* 삭제 버튼 */}
      <button
        id={`delete-btn-${todo.id}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // 상위 div의 토글 이벤트 전파 방지
          onDeleteTodo(todo.id);
        }}
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
        aria-label="할 일 삭제"
        title="삭제"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
};

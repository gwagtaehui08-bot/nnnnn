import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  // 새로운 할 일이 등록될 때 부모 컴포넌트로 텍스트를 전달하는 함수
  onAddTodo: (text: string) => void;
}

/**
 * TodoInput 컴포넌트
 * - 사용자가 할 일을 입력하고 추가할 수 있는 폼 컴포넌트입니다.
 * - 입력창 자체의 텍스트는 내부 useState(`inputText`)로 관리됩니다.
 */
export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  // 1. 사용자가 입력 중인 텍스트를 저장하는 로컬 상태(State)
  const [inputText, setInputText] = useState<string>('');

  // 2. 폼 제출 핸들러 (Enter 키를 누르거나 추가 버튼 클릭 시 실행)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 브라우저가 새로고침되는 기본 동작 방지

    const trimmedText = inputText.trim(); // 앞뒤 공백 제거
    if (!trimmedText) {
      return; // 빈 문자열인 경우 추가하지 않음
    }

    // 부모 컴포넌트(App)에서 넘겨받은 onAddTodo 함수를 호출하여 할 일 추가
    onAddTodo(trimmedText);

    // 입력창 초기화
    setInputText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative flex items-center">
        <input
          id="todo-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="새로운 할 일을 입력하세요..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-24 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition-all focus:border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-800/10"
        />
        <button
          id="todo-add-btn"
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900"
          aria-label="할 일 추가"
        >
          <Plus className="h-4 w-4" />
          <span>추가</span>
        </button>
      </div>
    </form>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Todo, FilterType } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';

export default function App() {
  /**
   * [핵심 상태 관리: useState]
   * 요구사항에 따라 외부 데이터베이스나 브라우저 저장소(localStorage)를 사용하지 않고,
   * 순수 React의 useState 훅만을 사용하여 메모리(배열)에 상태를 저장합니다.
   * 브라우저를 새로고침하면 아래의 초기 상태로 되돌아갑니다.
   */

  // 1. 전체 할 일 목록을 관리하는 State (Todo 객체의 배열)
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: 'React 컴포넌트와 useState 기본 개념 익히기',
      completed: true,
      createdAt: '오전 09:30',
    },
    {
      id: 2,
      text: '새로운 할 일 입력창에 텍스트 넣고 추가해보기',
      completed: false,
      createdAt: '오전 11:00',
    },
    {
      id: 3,
      text: '체크박스 클릭으로 완료 상태 토글하기',
      completed: false,
      createdAt: '오후 01:15',
    },
  ]);

  // 2. 현재 선택된 필터 상태 ('all' | 'active' | 'completed')
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  /**
   * [할 일 추가 함수: handleAddTodo]
   * 새로운 할 일 텍스트를 받아 신규 Todo 객체를 생성하고 기존 배열에 추가합니다.
   * * 초보자 팁: React에서는 배열의 불변성을 유지하기 위해 push 대신 스프레드 연산자([...todos, newTodo])를 사용합니다.
   */
  const handleAddTodo = (text: string) => {
    // 현재 시간을 '오전/오후 HH:MM' 형식으로 추출
    const timeString = new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date());

    const newTodo: Todo = {
      id: Date.now(), // 고유한 ID로 현재 타임스탬프(밀리초) 사용
      text,
      completed: false,
      createdAt: timeString,
    };

    // 기존 배열에 새 할 일을 추가한 새로운 배열을 상태에 반영
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  /**
   * [완료 여부 토글 함수: handleToggleTodo]
   * 대상 할 일의 id를 받아 completed 값을 반전(true <-> false)시킵니다.
   * * 초보자 팁: map 함수를 사용하여 변경 대상 항목만 completed 값을 바꾸고, 나머지는 그대로 유지합니다.
   */
  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * [할 일 삭제 함수: handleDeleteTodo]
   * 대상 할 일의 id를 받아 해당 항목을 배열에서 제거합니다.
   * * 초보자 팁: filter 함수를 사용하여 삭제할 id와 다른 항목들만 남깁니다.
   */
  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  /**
   * [필터링 및 개수 집계 계산]
   * 파생 데이터(Derived State)는 별도의 state로 만들지 않고, 렌더링 시점에 계산하여
   * 상태 동기화 문제를 방지합니다.
   */
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  // 현재 필터 옵션에 따라 사용자에게 보여줄 할 일 목록 선별
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === 'active') {
      return !todo.completed; // 진행 중인 항목만
    }
    if (currentFilter === 'completed') {
      return todo.completed; // 완료된 항목만
    }
    return true; // 'all'인 경우 전체 항목
  });

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12 text-slate-900 antialiased">
      <main className="mx-auto w-full max-w-xl px-4 sm:px-6">
        {/* 앱 컨테이너 카드 */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all">
          {/* 1. 헤더: 제목, 날짜, 현황 요약 */}
          <TodoHeader
            totalCount={totalCount}
            completedCount={completedCount}
          />

          {/* 2. 할 일 입력 폼 */}
          <TodoInput onAddTodo={handleAddTodo} />

          {/* 3. 필터 탭 (전체 / 진행 중 / 완료) */}
          <TodoFilter
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            counts={{
              all: totalCount,
              active: activeCount,
              completed: completedCount,
            }}
          />

          {/* 4. 할 일 목록 출력 */}
          <TodoList
            todos={filteredTodos}
            currentFilter={currentFilter}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />

          {/* 하단 안내 및 단축키/팁 정보 */}
          {totalCount > 0 && (
            <footer className="mt-8 border-t border-slate-100 pt-4 text-center">
              <p className="text-xs text-slate-400">
                💡 할 일 항목을 클릭하면 완료 상태로 변경되며, 휴지통 아이콘을 누르면 삭제됩니다.
              </p>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
}

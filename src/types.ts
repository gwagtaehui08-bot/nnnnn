/**
 * Todo List 애플리케이션에서 사용하는 타입 정의 모음
 */

// 할 일(Todo) 객체의 구조를 정의하는 인터페이스
export interface Todo {
  id: number;           // 고유 식별자 (ID)
  text: string;         // 할 일 내용
  completed: boolean;   // 완료 여부 (true: 완료, false: 진행 중)
  createdAt: string;    // 생성 일자/시간 (표시용)
}

// 필터 상태를 나타내는 타입 ('전체' | '진행 중' | '완료')
export type FilterType = 'all' | 'active' | 'completed';

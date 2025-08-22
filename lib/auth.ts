// 임시 사용자 데이터
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  membershipPlan: 'free' | 'basic' | 'standard';
}

// 임시 사용자 데이터베이스
const users: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'test@blogtalk.io',
    password: 'test123',
    name: '테스트 사용자',
    role: 'user',
    membershipPlan: 'basic'
  },
  {
    id: '2',
    email: 'admin@blogtalk.io',
    password: 'admin123',
    name: '관리자',
    role: 'admin',
    membershipPlan: 'standard'
  },
  {
    id: '3',
    email: 'redmodel11@naver.com',
    password: 'dlaldud112!',
    name: '실제 사용자',
    role: 'user',
    membershipPlan: 'standard'
  }
];

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // 실제 환경에서는 해시된 비밀번호와 비교해야 함
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}

export function getUserByEmail(email: string): User | null {
  const user = users.find(u => u.email === email);
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}
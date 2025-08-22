import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: '로그인 | 블톡 플래너',
  description: '블톡 플래너에 로그인하여 모든 기능을 이용해보세요.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <LoginForm />
      </main>
    </div>
  );
}
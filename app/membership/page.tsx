import Header from '@/components/Header';
import MembershipPlans from '@/components/MembershipPlans';
import FeatureComparison from '@/components/FeatureComparison';
import PaymentInfo from '@/components/PaymentInfo';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export const metadata = {
  title: '멤버십 | 블톡 플래너',
  description: '블로거 인플루언서를 위한 실용적인 기능을 모두 담았어요.',
};

export default function MembershipPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">멤버십</h1>
            <p className="text-lg text-gray-600">
              블로거 인플루언서를 위한<br />
              실용적인 기능을 모두 담았어요.
            </p>
          </div>
          
          <MembershipPlans />
          <FeatureComparison />
          <PaymentInfo />
          <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
import HomeContent from '@/components/HomeContent';

export async function generateMetadata() {
  
  return {
	  title: 'Dashboard',
  };
}

export default async function Home() {

  return (
	   <HomeContent/>
  );
}

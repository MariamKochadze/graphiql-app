import AboutCourse from '@components/AboutCourse/AboutCourse';
import AboutProject from '@components/AboutProject/AboutProject';
import HomeSection from '@components/HomeSection/HomeSection';
import Participants from '@components/Participants/Participants';
import { Suspense } from 'react';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <Suspense key={`${searchParams.page}_${searchParams.query}`} fallback={<div>Loading ...</div>}>
      <HomeSection />
      <AboutProject />
      <AboutCourse />
      <Participants />
    </Suspense>
  );
}

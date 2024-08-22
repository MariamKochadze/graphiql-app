import ParticipantsCard from '@components/ParticipantsCard/Card';
import { useTranslations } from 'next-intl';
import { StaticImageData } from 'next/image';
// import MariamImg from '../../public/assets/Mariam.webp';
import VictoriaImg from '../../public/assets/Victoria.jpeg';

interface Participant {
  id: number;
  img: StaticImageData;
  name: string;
  position: string;
  detail: string;
}

const Participants = () => {
  const t = useTranslations('HomePage');
  const participants: Participant[] = [
    {
      id: 1,
      img: 'MariamImg',
      name: 'Mariam Kochadze',
      position: t('Participant1Position'),
      detail: t('Participant1Description'),
    },
    {
      id: 2,
      img: VictoriaImg,
      name: 'Victoria Nykytenko',
      position: t('Participant2Position'),
      detail: t('Participant2Description'),
    },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-center text-light-blue text-4xl font-semibold mb-5">{t('ParticipantsTitle')}</h2>
        <div className="flex gap-6 my-6">
          {participants.map(item => (
            <ParticipantsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Participants;

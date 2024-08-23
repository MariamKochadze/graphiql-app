import ParticipantsCard from '@components/ParticipantsCard/Card';
import { useTranslations } from 'next-intl';
import { StaticImageData } from 'next/image';
import MariamImg from '../../public/assets/Mariam.jpg';
import UmidaImg from '../../public/assets/Umida.jpg';
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
      img: MariamImg,
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
    {
      id: 3,
      img: UmidaImg,
      name: 'Umida Abdugafurova',
      position: t('Participant3Position'),
      detail: t('Participant3Description'),
    },
  ];
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-center text-light-blue text-4xl font-semibold mb-5">{t('ParticipantsTitle')}</h2>
        <div className="grid grid-cols-2 justify-center gap-6 my-6">
          {participants.map(item => (
            <ParticipantsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Participants;

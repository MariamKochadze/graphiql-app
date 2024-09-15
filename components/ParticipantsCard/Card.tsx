import { StaticImageData } from 'next/image';
import Image from 'next/legacy/image';
import React from 'react';

interface ParticipantsCardProps {
  item: {
    img: StaticImageData;
    name: string;
    position: string;
    detail: string;
  };
}
const ParticipantsCard: React.FC<ParticipantsCardProps> = ({ item }) => {
  return (
    <div className="flex  flex-col justify-between bg-regal-white p-8 border border-neutral-200 rounded-3xl !shadow-shadow-m text-regal-gray">
      <p className="">{item.detail}</p>
      <div className="flex mt-5 gap-3">
        <div className="max-w-20 max-h-20 rounded-full overflow-hidden">
          <Image src={item.img} alt={item.name} width={80} height={108} />
        </div>
        <div className="">
          <h2 className="">{item.name}</h2>
          <h3 className="lg:whitespace-pre whitespace-break-spaces">{item.position}</h3>
        </div>
      </div>
    </div>
  );
};
export default ParticipantsCard;

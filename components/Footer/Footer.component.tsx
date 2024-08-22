import Image from 'next/image';
import Link from 'next/link';
import CourseLogo from '../../public/assets/course-logo.png';
import GithubIcon from '../../public/assets/github-icon.png';

const participantGithubLink = [
  { githubLink: 'https://github.com/MariamKochadze', name: 'Mariam Kochadze' },
  {
    githubLink: 'https://github.com/kitakiv',
    name: 'Victoria Nykytenko',
  },
  {
    githubLink: 'https://github.com/AbdugafurovaUmida',
    name: 'Umida Abdugafurova',
  },
];

export const Footer = () => (
  <footer className="bg-regal-blue py-10">
    <div className="container">
      <div className="flex justify-between">
        <div className="flex">
          {participantGithubLink.map(item => (
            <Link key={item.name} href={item.githubLink} target="_blank" rel="noreferrer">
              <Image src={GithubIcon} alt={item.name} width={40} height={40} />
            </Link>
          ))}
        </div>
        <p className="text-regal-gray">{new Date().getFullYear()}</p>
        <Link href="https://rs.school/" target="_blank" rel="noreferrer">
          <Image src={CourseLogo} alt="course-logo" width={100} height={20} />
        </Link>
      </div>
    </div>
  </footer>
);

import { Link } from "react-router-dom";
import { personalInfo, socialLinks } from "../constants";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        {personalInfo.aboutHeading}
        <span className='font-semibold mx-2 text-white'>{personalInfo.displayName}</span>
        <br />
        {personalInfo.titles}
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          {personalInfo.heroSubtext}
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Learn more
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Led multiple projects to success over the years. <br /> Curious about the impact?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my portfolio
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Need a project done or looking for a dev? <br/> I'm just a few keystrokes away
      </p>

      <Link to='/contact' className='neo-brutalism-white neo-btn'>
        Let's talk
        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  if (currentStage === 5) {
    const githubLink = socialLinks.find(link => link.name === 'GitHub');
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Check out my open-source work and code repositories.
        </p>

        <a href={githubLink?.link} target="_blank" rel="noreferrer" className='neo-brutalism-white neo-btn'>
          Visit my GitHub
          <img src={githubLink?.iconUrl || arrow} alt='github' className='w-4 h-4 object-contain' />
        </a>
      </div>
    );
  }

  if (currentStage === 6) {
    const linkedinLink = socialLinks.find(link => link.name === 'LinkedIn');
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Let's connect professionally!
        </p>

        <a href={linkedinLink?.link} target="_blank" rel="noreferrer" className='neo-brutalism-white neo-btn whitespace-nowrap'>
          View my LinkedIn
          <img src={linkedinLink?.iconUrl || arrow} alt='linkedin' className='w-4 h-4 object-contain' />
        </a>
      </div>
    );
  }

  if (currentStage === 7) {
    return (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Want a detailed summary of my experience?
        </p>

        <div className='flex gap-2 w-full'>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer" className='neo-brutalism-white neo-btn flex-1 text-center text-sm'>
            View
            <img src={arrow} alt='resume' className='w-4 h-4 object-contain ml-2 inline-block' />
          </a>
          <a href={`${import.meta.env.BASE_URL}resume.pdf`} download="Srishanth_Resume.pdf" className='neo-brutalism-white neo-btn flex-1 text-center text-sm'>
            Download
            <img src={arrow} alt='download' className='w-4 h-4 object-contain ml-2 inline-block transform rotate-90' />
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default HomeInfo;

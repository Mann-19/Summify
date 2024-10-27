import { logo } from '../assets/index';

const Hero = () => {
  return (
    <header className='flex justify-center items-center flex-col w-full'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt="logo" className='w-28 object-contain' />

        <button 
        type='button' 
        className='black_btn' 
        onClick={() => window.open("https://www.fikfap.com/")}
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Summarize your articles with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  )
}
export default Hero
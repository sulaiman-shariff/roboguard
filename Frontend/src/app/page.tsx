'use client'
import React,{ useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../Components/buttons'
import { ChevronDown, Sun, Moon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [showMore, setShowMore] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [answer, setAnswer] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [shuffledImgs, setShuffledImgs] = useState<{ src: string; alt: string; answer: string; style: React.CSSProperties }[]>([])
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  
  const imgs = [
    { src: '/images/image1.jpg', alt: 'Game Image1', answer: 'Real' },
    { src: '/images/image2.jpg', alt: 'Game Image2', answer: 'Fake' },
    { src: '/images/image3.jpg', alt: 'Game Image3', answer: 'Fake' },
    { src: '/images/image4.png', alt: 'Game Image4', answer: 'Real' },
    { src: '/images/image5.jpg', alt: 'Game Image5', answer: 'Fake' },
    { src: '/images/image6.png', alt: 'Game Image6', answer: 'Real' },
    { src: '/images/image7.png', alt: 'Game Image7', answer: 'Fake' },
    { src: '/images/image8.jpg', alt: 'Game Image8', answer: 'Real' },
    { src: '/images/image9.jpg', alt: 'Game Image9', answer: 'Fake' },
    { src: '/images/image10.jpeg', alt: 'Game Image10', answer: 'Real' },
    { src: '/images/image11.jpeg', alt: 'Game Image11', answer: 'Real' },
    { src: '/images/image12.jpg', alt: 'Game Image12', answer: 'Fake' },
    { src: '/images/image13.jpeg', alt: 'Game Image13', answer: 'Real' },
    { src: '/images/image14.png', alt: 'Game Image14', answer: 'Fake' },
    { src: '/images/image15.jpeg', alt: 'Game Image15', answer: 'Real' },
    { src: '/images/image16.jpeg', alt: 'Game Image16', answer: 'Fake' },
    { src: '/images/image17.jpeg', alt: 'Game Image17', answer: 'Fake' },
    { src: '/images/image18.jpeg', alt: 'Game Image18', answer: 'Real' },
    { src: '/images/image19.png', alt: 'Game Image19', answer: 'Real' },
    { src: '/images/image20.jpeg', alt: 'Game Image20', answer: 'Real' }
  ].map(img => ({...img, style: { width: '400px', height: '400px' }}))

  const shuffleArray = (array: { src: string; alt: string; answer: string; style: React.CSSProperties }[]) => {
    let shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
    }
    return shuffledArray
  }

  useEffect(() => {
    setShuffledImgs(shuffleArray(imgs))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY === 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % shuffledImgs.length);
    setAnswer(''); // Clear answer for the next question
  };

  const handleSelect = (selectedAnswer:string) => {
    const isCorrect = selectedAnswer === shuffledImgs[currentImageIndex].answer;
    setAnswer(isCorrect ? 'correct' : 'incorrect'); // Set answer to either 'correct' or 'incorrect'
  };
  const [isProtectHovered, setProtectHovered] = useState(false);
  const [isDetectHovered, setDetectHovered] = useState(false);
  return (
    
    <div 
  className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} overflow-hidden relative`} 
  style={{
    backgroundImage: 'url("C:\Users\Hemanth\antiAI\Frontend\public\images\background.png")', // Change to your image path
    backgroundSize: 'cover', // Cover the entire area
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  }}
>
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-md transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img 
          src={theme === 'dark' ? "/images/RG_dark.png" : "/images/RG_white.png"} 
          alt="roboguard logo" 
          className="h-8" 
          />

          <div className="flex space-x-6 items-center">
            <Link href="#home" className="text-lg font-medium hover:text-blue-400 transition-colors">Home</Link>
            <Link href="#playground" className="text-lg font-medium hover:text-blue-400 transition-colors">Playground</Link>
            <Button variant="ghost" onClick={toggleTheme} className="p-2">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-24 relative z-10">
  <section id="home" className="py-20">
  <motion.div
      style={{
        position: "relative",
        width: "100vw",  // Full viewport width
        height: "50vh", // Full viewport height
        overflow: "hidden", // Ensures the image doesn't go out of bounds
      }}
    >
      <motion.img
      src={theme === 'dark' ? "/images/brain_transparent.png" : "/images/brain.png"}
      alt="Your image"
      style={{
        position: "absolute",
        top: "0",   // Align to the top
        width: "600px",  // Set the image width
        height:"50vh"
      }}
      initial={{ x: "0vw" }}  // Start off-screen on the right
      animate={{ x: "50vw" }}  // Animate to the leftmost corner
      transition={{ duration: 1 }}  // Set animation duration
    />
      <motion.img
        src={theme === 'dark' ? "/images/LOGO.png" : "/images/logo_white.png"}
        alt="Your image"
        style={{
          position: "absolute",
          top: "0",   // Align to the top
          width: "600px",  // Set the image width
        }}
        initial={{ x: "30vw" }}  // Start off-screen on the right
        animate={{ x: 0 }}  // Animate to the leftmost corner
        transition={{ duration: 1 }}  // Set animation duration
      />
      
    </motion.div>
    <motion.p
        initial={{ opacity: 0, x: 10 }} // Start from right
        animate={{ opacity: 1, x: 50 }}   // Move to original position
        transition={{ duration: 0.5 }}     // Adjust duration as needed
        className="text-2xl font-black mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        USING AI TO STOP AI.
      </motion.p>

      <motion.p
          style={{
            width: "100%",  // Full width (optional)
            maxWidth: "600px",  // Limits the paragraph width to 600px
            textAlign: "left",}}
        initial={{ opacity: 0, x: 20 }} // Start from right
        animate={{ opacity: 1, x: 50 }}   // Move to original position
        transition={{ duration: 0.5 }}     // Adjust duration as needed
        className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} mb-8`}
      >
        Protecting user media from AI exploitation through content immunization and accurate AI detection, 
        ensuring your digital assets remain secure and authentic on social media.
      </motion.p>

      <motion.p 
       initial={{ opacity: 0, x:50 }}  // Start fully transparent
       animate={{ opacity: 1,y:100 }}  // Animate to fully visible
       transition={{ duration: 1 }}  // Set duration of 2 seconds
       style={{ //text-4xl font-extrabold text-center mb-10 text-gray-200
         fontSize: "36px",
         color: "#FFFFFF",  
         fontFamily: 'Poppins, extrabold',// Text color
         fontWeight:'800'
       }}
       >
              OUR SERVICES:

      </motion.p>

      <div className="flex flex-wrap justify-center gap-4">
      {/* Protect Button with Dropdown */}
      <div 
        className="relative inline-block text-left" 
        onMouseEnter={() => setProtectHovered(true)} 
        onMouseLeave={() => setProtectHovered(false)}
      >
        <Link href="/Protect">
        <AnimatePresence>
          {isProtectHovered && (
            <motion.div
              initial={{ opacity: 0, y: 100, x: -200 }}
              animate={{ opacity: 1, y: 190, x: -200 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                >
                  {"--> Feature goes beyond detection to actively protect content"}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                >
                 {"--> Necessary algorithms make the media resilient to deepfakes"}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          <motion.button
            initial={{ x: -500, opacity: 0 ,y:150}} // Start off-screen to the left
            animate={{ x: -200, opacity: 1 ,y:150}} // Slide in from left
            exit={{ x: -100, opacity: 0 }} // Slide out to the left
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: "#000000",
            }}
            whileTap={{
              scale: 0.6,
              borderColor: "#e74c3c",
            }}
            style={{
              padding: "10px 100px",
              fontSize: "16px",
              backgroundColor: "#000000",
              color: "#fff",
              border: "2px solid",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Protect
          </motion.button>
        </Link>

       
      </div>

      {/* Detect Button with Dropdown */}
      <div 
        className="relative inline-block text-left" 
        onMouseEnter={() => setDetectHovered(true)} 
        onMouseLeave={() => setDetectHovered(false)}
      >
        <Link href="/Detect">
        <AnimatePresence>
          {isDetectHovered && (
            <motion.div
              initial={{ opacity: 0, y: 100, x: 200 }}
              animate={{ opacity: 1, y: 190, x: 200 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                >
                 {"--> AI-driven detection for deepfake media"}
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                >
                  {"-->Continuous learning to detect evolving threats"}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          <motion.button
            initial={{ x: -500, opacity: 0 ,y:150}} // Start off-screen to the left
            animate={{ x: 200, opacity: 1 ,y:150}} // Slide in from left
            exit={{ x: -100, opacity: 0 }} // Slide out to the left
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: "#000000",
            }}
            whileTap={{
              scale: 0.6,
              borderColor: "#e74c3c",
            }}
            style={{
              padding: "10px 100px",
              fontSize: "16px",
              backgroundColor: "#000000",
              color: "#fff",
              border: "2px solid",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Detect
          </motion.button>
        </Link>

       
      </div>
    </div>  
  </section>


      <motion.section
        initial={{ opacity: 0, y: 275 }}
        animate={{ opacity: 1, y: 250 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 "
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-200">
            Why Choose RoboGuard?
          </h2>

          <ul className="space-y-8">
            {[
              "-->   Cutting-edge AI technology for robust protection",
              "-->   User-friendly browser extension for seamless integration",
              "-->   Continuous updates to stay ahead of emerging AI threats",
              "-->   Privacy-focused approach with no data collection",
              "-->   Compatible with major social media platforms",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-600 text-gray-400' : 'bg-white text-gray-600'
                }`}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>



        <motion.section id="playground" 
          initial={{ opacity: 0 ,y:200}} 
          animate={{ opacity: 1 ,y:200}} 
          transition={{ duration: 0.6 }}
          className="py-20 mb-40"
        >
        <div className="flex flex-col justify-center items-center">
          <motion.h2 className="text-6xl font-bold mb-8">Real or AI generated?</motion.h2>
          <motion.div className={`w-full max-w-xl ${theme === 'dark' ? 'bg-slate-800 border-slate-600' : 'bg-slate-200 border-slate-300'} border-2 rounded-lg p-10 flex flex-col items-center`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {shuffledImgs.length > 0 && (
              <img
                src={shuffledImgs[currentImageIndex].src}
                className="w-full h-80 object-contain rounded-lg mb-8"
                alt={shuffledImgs[currentImageIndex].alt}
              />
            )}
            <div className="flex space-x-6 mb-6">
              <Button
                variant="outline"
                className="w-28 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleSelect('Real')}
                onClickCapture={() => handleNext()}
              >
                Real
              </Button>
              <Button
                variant="outline"
                className="w-28 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => handleSelect('Fake')}
                onClickCapture={() => handleNext()}
              >
                AI
              </Button>
            </div >

            {answer && (
              <div className={`mt-6 text-xl ${answer === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                {answer === 'correct' ? 'Correct Answer!' : 'Incorrect Answer, try again!'}
              </div>
            )}
          </motion.div>
        </div>

        </motion.section>
      </main>




      <footer className={`${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-100/50'}   py-8 relative z-10 `}>
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 roboguard. All rights reserved.</p>
        </div>
      </footer>

      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <div className="w-full h-full">
        </div>
      </div>
    </div>
  )
}
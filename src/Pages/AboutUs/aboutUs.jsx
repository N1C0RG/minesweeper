import Navbar from "../../Commponents/Navbar/navbar";
import T1 from "../../assets/teammate1.jpg";

function AboutUs () { 
  return (
    <body className="text-gray-100">
      <Navbar />
      <div className="absolute inset-0 h-screen bgImage z-[-1] opacity-80"></div>
      <div>
        <h1 className="font-bold text-6xl sm:text-9xl text-blue-800	text-center">Who We Are</h1>
        <p className="mt-10 text-xl sm:text-3xl ">
          I am a person with a bit of free time after the semester, so I decided to make a Minesweeper game.
        </p>

        <section className="flex flex-col">
          <h2 className="mt-10 text-5xl sm:text-7xl">About Myself</h2>
          <div className="container self-center items-center flex flex-col gap-3 p-10 bg-gray-100 rounded-lg size-96 mt-5">
            <img className="size-1/2 rounded-full" src={T1} alt="teammate 1" />
            <h3 className="text-4xl text-sky-700">Nicolás Royo</h3>
            <p className="text-blue-900 text-justify">
              I am a 3rd year student at the Pontificia Universidad Católica de Chile, 
              studying engineering with a major in software engineering. 
              I love Minesweeper and I hope that you enjoy the game.
            </p>
          </div>


        </section>
      
      </div>
    </body>
  )
}

export default AboutUs;
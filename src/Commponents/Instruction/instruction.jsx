function instruction({ images, text}) {
  return (
    <div className="container flex flex-col sm:flex-row p-4 rounded-lg gap-10 bg-[#004396] items-center">
      {images.map((image, index) => (
        <img key={index} className="hover:scale-110 sm:size-1/3 rounded" src={image} alt={`instruction ${index}`} />
      ))}
      <p className="text-slate-950 text-2xl sm:text-4xl">{text}</p>
    </div>
  )
}

export default instruction;
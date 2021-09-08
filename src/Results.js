const Results = ({nasaPhotos}) => {
  console.log(nasaPhotos);
  return(
    <ul>
      <h2>{nasaPhotos.title}</h2>
      <img src={nasaPhotos.url} alt={nasaPhotos.title} />
      <p>{nasaPhotos.explanation}</p>
    </ul>
  )
}

export default Results;
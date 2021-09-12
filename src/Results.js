const Results = ({nasaPhotos}) => {
  return(
    <ul className="imageResults">
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
            </li>
          )
        })
      }
    </ul>
  )
}

export default Results;
const Results = ({nasaPhotos}) => {
  return(
    <ul>
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date}>
              <img src={results.url} alt={results.title} />
              <h2>{results.title}</h2>
              <p>{results.date}</p>
              <p>{results.explanation}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Results;
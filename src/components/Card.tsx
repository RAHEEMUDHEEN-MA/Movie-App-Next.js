import React, { useState } from 'react'
interface prpsType{
    MoviePosterIMG:string
    movieID:string
    MovieTitle:string
    releaseDate:string

}

const Card = ({movieID,MovieTitle,MoviePosterIMG,releaseDate}:prpsType) => {

 const[loading,setLoading]=useState(false)
 const [error, seterror] = useState(false)
  return (
    <div>
        Card
    </div>
  )
}

export default Card

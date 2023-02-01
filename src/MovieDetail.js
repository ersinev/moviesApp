import React, { useEffect, useState } from 'react'
// import bootstrap components
import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function MovieDetail() {
    const [movieDetail, setMovieDetail] = useState([])
    const [movieTrailer,setMovieTrailer] = useState('')
    // https://api.themoviedb.org/3/movie/616037?api_key=07a61de5b731a869bc9cec8e25d2c8a8&language=en-US
    // https://api.themoviedb.org/3/movie/616037/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8&language=en-US
    const { movie_id } = useParams()
    // async func 
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=07a61de5b731a869bc9cec8e25d2c8a8&language=en-US`)
            .then(response => response.json())
            .then(data => {
                setMovieDetail(data)
            })
            // https://www.youtube.com/watch?v=oRu0KYKWEGQ
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=07a61de5b731a869bc9cec8e25d2c8a8&language=en-US`)
        .then(response=>response.json())
        .then(data=>{
           setMovieTrailer(data.results[0].key)
           // console.log(data)
        })
    }, [movie_id])
    return (
        <Container className="bg-dark p-0" fluid={true}>
            <div className="p-5 bg-primary text-white movie-img rounded-0" style={{ 'background': `url(https://image.tmdb.org/t/p/w500${movieDetail.poster_path})` }}>
                <h1 className='text-center movie-title'>{movieDetail.original_title}</h1>
            </div>
            <Row className="p-0 m-0 ">
                <Col md={3} className="p-3 detail-left">
                    <ListGroup>
                        <ListGroup.Item className="bg-none text-light border-0 py-1 ">
                            <Badge bg="warning" text="dark" className="w-100 rounded-0 text-start">ImDB Score: <p className='bg-white rounded-0 d-inline px-2 py-1'>
                                {Math.floor(movieDetail.vote_average)}
                            </p></Badge>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-none text-light border-0 py-1">
                            <Badge bg="warning" className="w-100 rounded-0 text-start" text="dark">Movie Language: <p className='bg-white d-inline rounded-0 px-2 py-1'>{
                                movieDetail.original_language !== undefined ?
                                    movieDetail.original_language.toUpperCase()
                                    :
                                    ''
                            }</p></Badge>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-none text-light border-0 py-1">
                            <Badge bg="warning" className="w-100 rounded-0 text-start" text="dark">Category: </Badge>
                            <ListGroup>
                                {
                                    movieDetail.genres !== undefined ?
                                        movieDetail.genres.map((cat, index) => (
                                            <ListGroup.Item className="rounded-0 py-0" key={cat.id}>{cat.name}</ListGroup.Item>
                                        )) :
                                        ''
                                }
                            </ListGroup>
                                
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-none text-light border-0 py-1">
                            <Badge bg="warning" className="w-100 rounded-0 text-start" text="dark">Production: </Badge>
                            <ListGroup>
                                {
                                    movieDetail.production_companies !== undefined ?
                                        movieDetail.production_companies.map((prod) => (
                                            <ListGroup.Item className="rounded-0 py-0" key={prod.id}>
                                                <a href={movieDetail.homepage} rel="noreferrer" className="text-decoration-none text-dark" target="_blank">{prod.name}</a>
                                            </ListGroup.Item>
                                        )) :
                                        ''
                                }
                            </ListGroup>

                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={8}>
                    <h1 className="text-light display-6 p-2 movie-story">Overview</h1>
                    <p className="text-light">
                        {
                            movieDetail.overview !== undefined ?
                                movieDetail.overview
                                :
                                'not available'
                        }
                    </p>
                    <iframe width={560} height={315} src={`https://www.youtube.com/embed/${movieTrailer}`} title="YouTube video player" frameBorder={0}
                    className="youtube-video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Col>
            </Row>
        </Container>
    )
}

export default MovieDetail
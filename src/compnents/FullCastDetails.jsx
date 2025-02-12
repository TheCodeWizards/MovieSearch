import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import options from '../Other/UrlHeader';
import Loader from './Loader';
const FullCastDetails = () => {
    const { id, type } = useParams();
    const [cast, setCast] = useState();
    const [camera, setCamera] = useState();
    const [art, setArt] = useState();
    const [producer, setProducer] = useState();
    const [director, setDirector] = useState();
    const [editor, setEditor] = useState();
    const [lightMan, setLightMan] = useState();
    const [makeUp, setMakeUp] = useState();
    const [sound, setSound] = useState();
    const [visiualEffect, setVisiualEffect] = useState();
    const [writer, setWriter] = useState();
    const [crew, setCrew] = useState();

    const checkType = () => {
        if (type === 'movie') {
            return `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
        } else {
            return `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US`;
        }
    };
    useEffect(() => {
        const fetchCast = async () => {
            const url = checkType();
            try {
                const res = await fetch(url, options);
                const data = await res.json();

                console.log(data.crew)

                const filterCast = data.cast.filter((item) => item.profile_path !== null);
                setCast(filterCast || []);

                const cameraman = (data.crew || []).filter((item) => item.known_for_department === "Camera")
                setCamera(cameraman || []);

                const artist = (data.crew || []).filter((item) => item.known_for_department === "Art")
                setArt(artist || []);

                const producers = (data.crew || []).filter((item) => item.known_for_department === "Production")
                setProducer(producers || []);

                const director = (data.crew || []).filter((item) => item.known_for_department === "Directing")
                setDirector(director || []);

                const editor = (data.crew || []).filter((item) => item.known_for_department === "Editing")
                setEditor(editor || []);
                const makeUp = (data.crew || []).filter((item) => item.known_for_department === "Costume & Make-Up")
                setMakeUp(makeUp || []);

                const sound = (data.crew || []).filter((item) => item.known_for_department === "Sound")
                setSound(sound || []);

                const effects = (data.crew || []).filter((item) => item.known_for_department === "Visual Effects")
                setVisiualEffect(effects || []);

                const writer = (data.crew || []).filter((item) => item.known_for_department === "Writing")
                setWriter(writer || []);

                const crew = (data.crew || []).filter((item) => item.known_for_department === "Crew")
                setCrew(writer || []);
            } catch (err) {
                console.error('Error fetching cast:', err);
            }
        };
        fetchCast();
    }, [id, type]);
    return (
        <>
        
        
        <div className='bg-black flex gap-10 items-start  text-white h-full px-30 py-10'>
            <div className='flex-1'>
                <h1 className='text-2xl font-medium'>Cast</h1>
                {cast ?
                    cast.map((item) => (
                        <div key={item.id} className='flex items-center my-3 gap-5'>
                            <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} className='rounded-xl' style={{ width: "70px", height: "auto" }} />
                            <div>
                                <p className=' font-medium'>{item.name}</p>
                                <p className=' text-sm text-gray-400'>{item.character}</p>
                            </div>
                        </div>
                    )) :
                    <Loader />
                }
            </div>
            <div className='flex-1'>
                <h1 className='text-2xl font-medium'>Art</h1>
                {art ?
                    art.map((item) => (
                        <div className='flex my-3 gap-5'>
                            <img src={`https://image.tmdb.org/t/p/w185${item.profile_path}`} className='rounded-xl' style={{ width: "70px" }} />
                            <p className='text-xl font-medium'>{item.name}</p>
                        </div>
                    )) :
                    <Loader />
                }
                <h1 className='text-2xl font-medium'>Camera </h1>
                {camera ?
                    camera.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Proucer </h1>

                {producer ?
                    producer.map((item, i) => (
                        <CastJob key={item.id + i} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Dir </h1>

                {director ?
                    director.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Make up </h1>

                {makeUp ?
                    makeUp.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Sound </h1>

                {sound ?
                    sound.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>visiualEffect </h1>

                {visiualEffect ?
                    visiualEffect.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Writer </h1>

                {writer ?
                    writer.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
                <h1 className='text-2xl font-medium'>Crew </h1>
                {crew ?
                    crew.map((item) => (
                        <CastJob key={item.id} state={item} />
                    )) :
                    null
                }
            </div>
        </div >
        </>
  
    )
}

export default FullCastDetails;

import React from 'react'

const CastCard = ({ cast }) => {
  return (
    <div key={cast.id} className="flex hover:brightness-[90%] flex-col items-center text-center">
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
            : 'https://via.placeholder.com/185x278?text=No+Image'
        }
        alt={cast.name}
        className="rounded-lg  mb-2"
      />
      <p className="text-black text-sm font-medium">{cast.name}</p>
      <p className="text-[#7b7b7b] text-xs">{cast.roles ? cast.roles[0].character : cast.character}</p>
    </div>
  )
}

export default CastCard

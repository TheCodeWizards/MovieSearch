import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SearchResults from './pages/SearchResults.jsx'
import MovieProvider from './context/MovieProvider.jsx'
import FullCastDetails from './compnents/FullCastDetails.jsx'
import PeopleDetail from './pages/PeopleDetail.jsx'
import EpisodeDetail from './pages/EpisodeDetail.jsx'
import Review from './pages/ReviewPage.jsx'
import VideoPage from './pages/VideoPage.jsx'
import ImagesPage from './pages/ImagesPage.jsx'
import PopularMovie from './pages/PopularMovie.jsx'
import TopRatedMovie from './pages/TopRatedMovie.jsx'
import UpComingMovie from './pages/UpComingMovie.jsx'
import TopRatedTV from './pages/TopRatedTV.jsx'
import PopularTv from './pages/PopularTv.jsx'
import AirToday from './pages/AirToday.jsx'
import PopularPeople from './pages/PopularPeople.jsx'
import WatchlistPage from './compnents/WatchListPage.jsx'
import { LoadingBarContainer } from 'react-top-loading-bar'
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    path: '/',
    element: <Home />,
  }, {
    path: "/:type/:id",
    element: <MovieDetails />,
  }
  , {
    path: "/person/:id/:name",
    element: <PeopleDetail />,
  },
  {
    path: "/episode-details/:id",
    element: <EpisodeDetail />,
  }
    , {
    path: "/search",
    element: <SearchResults />,
  }
  , {
    path: "/:type/:id/review",
    element: <Review />,

  },
  , {
    path: "/watchList",
    element: <WatchlistPage />,

  },
  // Movie routes
  {
    path: "/movie/popular",
    element: <PopularMovie />,
  },{
    path: "/movie/top-rated",
    element: <TopRatedMovie />,
  }
  ,{
    path: "/movie/upcoming",
    element: <UpComingMovie />,
  },
  // Tv routes
  {
    path: "/tv/popular",
    element: <PopularTv />,
  },
  {
    path: "/tv/top-rated",
    element: <TopRatedTV />,
  },
  {
    path: "/tv/airing-today",
    element: <AirToday />,
  },
  {
    path: "/people/popular",
    element: <PopularPeople />,
  },
]
}, {
  path: '/:type/:id/images',
  element: <ImagesPage />
},
  , {
  path: '/:type/:id/videos',
  element: <VideoPage />
}
, {
  path: '/:type/:id/cast',
  element: <FullCastDetails />
},
])
createRoot(document.getElementById('root')).render(
  <MovieProvider>
  <RouterProvider router={router}>
      <LoadingBarContainer>
      <App />
      </LoadingBarContainer>
  </RouterProvider>
  </MovieProvider>


)

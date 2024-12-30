import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css'
import Navbar from './navbar'
import AlbumItem from './AlbumItem';
import image1 from '../assets/image-1.jpeg';
import image2 from '../assets/image-2.jpg';
import image3 from '../assets/image-3.jpg';
import image4 from '../assets/image-4.jpg';
import image5 from '../assets/image-5.jpg';
import image6 from '../assets/image-6.jpg';
import SongItem from './SongItem';


const albums = [
  {
    
    image: image1,
    title: 'Album 1',
    desc: 'This is the description for Album 1.',
  },
  {
    
    image: image2,
    title: 'Album 2',
    desc: 'This is the description for Album 2.',
  },
  {
    
    image: image3,
    title: 'Album 3',
    desc: 'This is the description for Album 3.',
  },
  {
    
    image: image4,
    title: 'Album 4',
    desc: 'This is the description for Album 4.',
  },
  {
    
    image: image5,
    title: 'Album 5',
    desc: 'This is the description for Album 5.',
  },
  {
    
    image: image6,
    title: 'Album 6',
    desc: 'This is the description for Album 6.',
  },
];

const Home = () => {

  const [songs, setSongs] = useState([]); 

  useEffect(() => {
    // Fetch song details from the backend
    fetch("http://localhost:8080/api/songs/getdetails")
      .then((response) => response.json())
      .then((data) =>{
                      console.log(data); 
                      setSongs(data);}) // Set the fetched data to state
      .catch((error) => console.error('Error fetching songs:', error));
  }, []); // Empty dependency array to run this effect only once
 
  
  
  return (
    <> 
    <Navbar/>
    <div className="home">
    <h3>Featured Charts</h3>
     <div className='albumItem'>
        {albums.map((album,index)=>(
          <AlbumItem key={index} title={album.title} desc={album.desc}  img={album.image}/>         
        ))}

     </div>
     <h3>Today's Top Hits</h3> 
     <div className='albumItem'>
     {songs.map((song, index) => (     //backend connection
            <SongItem
              key={index}
              SongName={song.songName} 
              artistName={song.artist}
              image={song.ImageUrl}
            />
          ))}

     </div>
    
     <h3>Favourite Artists</h3>
     <div className='albumItem'>
        {albums.map((album,index)=>(
          <SongItem key={index} SongName={album.title} artistName={album.desc}  image={album.image}/>         
        ))}

     </div>

     <div className='space'>

     </div>

    
    </div>
    </>
      
  );
}

export default Home;
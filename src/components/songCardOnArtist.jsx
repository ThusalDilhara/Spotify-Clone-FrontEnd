import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/ArtistPage.css"; 
import Swal from "sweetalert2";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const songCardOnArtist = ({song}) => {

//display tost msg
    const showToast = (message, backgroundColor, progressColor) => {
      toast.success(message, {
        icon: <FaSpotify size={40} color="white" />,
        autoClose: 5000,
        style: {
          background: backgroundColor,
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "12px 20px",
          borderRadius: "8px",
          "--toastify-color-progress-success": progressColor,
        },
      });
    };


    //handle the delete artist
    const manageSong = async(songName,songId) =>{
        Swal.fire({
            title: "Are you sure?",
            text: 'Delete ' +(`${songName}`)+' song..!',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            background:"#282828",color:"#FFFFFF"
      
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(`http://localhost:8080/api/songs/${songId}`)
                .then((response) => {
                  showToast("Delete Song Successfully..!", "green", "white");
                  //window.location.href = "/";
                })
                .catch((error) => {
                  console.error("Error deleting profile:", error);
                  showToast("Delete Song Successfully..!", "green", "white");
                });
                showToast("Delete Song Successfully..!", "green", "white");
                window.location.reload();
            }
          });


        };




  return (
    <li className="Artistsongitem">
      <div className="Artistsonginfo">
        <img src={song.imageUrl} alt={song.songName} className="Artistsongimage" />
        <div className="Artistsongdetails">
          <p className="Artistsongname">{song.songName}</p>
          <p className="songartist">{song.artist}</p>
          {/* <div className="Artistsongactions">
            <div className="play-btn-wrapper">
              <button className="play-btn" onClick={() => onPlay(song)}>
                <FaPlay className="play-icon" />
              </button>
              <span className="custom-tooltip">Play Song</span>
            </div>
            <div className="like-btn-wrapper">
              <button
                className="like-btn"
                onClick={() =>
                  onLikeToggle(song.songId, song.songName)
                }
              >
                {isLiked ? (
                  <FaHeart className="like-icon liked" />
                ) : (
                  <FaRegHeart className="like-icon" />
                )}
                <span className="custom-tooltip">
                  {isLiked ? "Liked" : "Add to Liked Songs"}
                </span>
              </button>
            </div>
          </div> */}
          <p className="songartistdetails"><a class="songbutton" onClick={() => manageSong(song.songName,song.songId)}>...</a></p>
        </div>
      </div>
    </li>
  );
};

export default songCardOnArtist;
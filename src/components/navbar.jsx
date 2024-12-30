import React from 'react'

const navbar = () => {
  return (
    <div style={{ display: 'flex',padding: '8px 20px', backgroundColor: '#121212',position:'fixed',gap:'5px',height:'40px',width:'100%',  borderRadius: '8px',marginLeft: '295px', zIndex:'10'}}>
      <button
        style={{
          backgroundColor:'white',
          color: 'black',
          border: 'none',
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '20px',
          transition: 'background-color 0.3s ease',
        }}
      >
        All
      </button>
      <button
        style={{
          backgroundColor: '#584c4c',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '20px',
          transition: 'background-color 0.3s ease',
        }}
      >
        Music
      </button>
    </div>
  );
};


export default navbar;
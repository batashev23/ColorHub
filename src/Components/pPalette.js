import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { poppalettes } from '../popPalettes';
import logo from '../logo.png';

const copy = <i class="fa-solid fa-copy"></i>

function PPalette() {
    const {id} = useParams()
    const initialPalette = poppalettes.find(pal => pal.name === id)

    const [popPalette] = React.useState(() => {
        const savedPalette = localStorage.getItem(`popPalette-${id}`)
        return savedPalette ? JSON.parse(savedPalette) : initialPalette
    })

    const [toRgb, setToRgb] = React.useState('hex');
    const [currentColor, setCurrentColor] = React.useState('');

    const toggleToRgb = (e) => {
        if(e.target.value === 'rgb'){
            setToRgb('rgb')
        }else{
            setToRgb('hex')
        }
    }

    const convertToRGB = (hex) => {
        hex = hex.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)

        return `rgb(${r}, ${g}, ${b})`
    }


    const handleFullColorClick = (event) => {
        setCurrentColor(event)
        setTimeout(() => {
            setCurrentColor('')
        }, 1300)
    }


    const handleCopyToClipboard = (e) => {
        const text = e.target.innerText;
        navigator.clipboard.writeText(text)
    }
    

    return (
        <PaletteStyled>
            <div className="header-items">
            <div className="link-con">
                <Link to={'/'}>
                    <img src={logo} alt="Logo" className="logo-image" />
                </Link>
            </div>
                <div className="select-type">
                    <select  value={toRgb} onChange={toggleToRgb}>
                        <option value="hex">HEX</option>
                        <option value="rgb">RGB</option>
                    </select>
                </div>
            </div>
            
            <div className="colors">
                {popPalette.colors.map((color, e) => {
                    return <div 
                        key={e} 
                        style={{background: color}}
                        className="full-color"
                        >
                            <button className='copy' onClick={(e) => {
                              handleCopyToClipboard(e)
                              handleFullColorClick(e.target.style.backgroundColor);
                            }}>{copy}</button>
                            <h4>
                                {toRgb === 'hex' ? color : convertToRGB(color)}
                            </h4>
                            
                        </div>
                })}
            </div>
            {currentColor && <div className="current-color" style={{backgroundColor: currentColor}}>
                <div className="text">
                    <h3>Successfully Coppied!</h3>
                </div>
            </div>
            }
        </PaletteStyled>
    )
}

const PaletteStyled = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;

  .btn-icon {
    cursor: pointer;
    font-size: 1.5rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem 1rem;
    border-radius: 7px;
    color: white;
    background: orange;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: #232C33;
    }
  }

  .header-items {
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    background-color: #232C33;

    .logo {
      margin-right: 2rem;
    }

    .logo-image {
      width: 150px;
      height: auto;
    }

    .link-con {
      a {
        text-decoration: none;
        font-family: inherit;
        font-size: inherit;
        color: orange;
        font-weight: 500;
        width: 50%;
      }
    }

    select {
      height: 4.8vh;
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      outline: none;
      color: white;
      background-color: orange;
      cursor: pointer;
    }

    .right {
      display: flex;
      align-items: center;
      gap: .8rem;
      justify-content: flex-end;

      button:last-child {
        background-color: #151B1F;
        
        &:hover {
          background: #232C33;
        }
      }
    }
  }

  .current-color {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0);
    transition: all 0.3s ease-in-out;
    animation: show 0.3s ease-in-out forwards;

    .text {
      background: rgba(255, 255, 255, 0.26);
      padding: 2rem 6rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.09);

      h3 {
        text-align: center;
        font-size: 5rem;
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        text-shadow: 3px 5px 7px rgba(0, 0, 0, 0.1);
      }
    }

    @keyframes show {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .colors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    width: 100%;
    min-height: 94vh;
    cursor: default;

    .full-color {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      h4 {
        font-size: 1.2rem;
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
        text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
        pointer-events: none;
        cursor: pointer;
      }

      .copy {
        position: absolute;
        top: 0;
        left: 0;
        padding: .3rem .4rem;
        font-size: 1.1rem;
        color: #fff;
        background: transparent;
        border: none;
        cursor: pointer;
        filter: drop-shadow(0 3px 0.3rem rgba(0, 0, 0, 0.4));
      }
    }
  }

  .color-picker-con {
    .sketch-picker {
      box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.5) !important;
    }

    .color-picker {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 11;

      button {
        margin: 1rem;
        font-size: 1.2rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: .5rem;
        box-shadow: 2px 2px 15px #232C33;
      }

      .back-to-p {
        font-size: 1rem;
        align-items: right;
        color: orange;
        font-weight: 700;
        text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
        pointer-events: none;
      }
    }

    .color-picker-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #232C33;
      z-index: 1;
    }
  }
`;

export default PPalette
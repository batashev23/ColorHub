import chroma from 'chroma-js'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import slugify from 'react-slugify'
import styled from 'styled-components'
import {mypalettes} from '../myPalettes'
import {poppalettes} from '../popPalettes'
import logo from '../logo.png';

function Palettes() {
    
    const [myPalettes, setMyPalettes] = useState(mypalettes)
    const [popPalettes, setPopPalettes] = useState(poppalettes)
    const [paletteName, setPaletteName] = React.useState('')
    const [lsPalettes, setLsPalettes] = useState([])
    
    
    React.useEffect(() => {
        const mypalettes = []

        for(let i = 0; i < localStorage.length; i++){
            
            const key = localStorage.key(i)
            
            if(key.startsWith('myPalette-')){
                
                const savedPalette = localStorage.getItem(key)
                if(savedPalette){
                    mypalettes.push(JSON.parse(savedPalette))
                }
            }
        }

        console.log('before sort',mypalettes)
        mypalettes.sort((a, b) => {
            return a.createdAt - b.createdAt
        })
        console.log('after sort', mypalettes)
        
        setLsPalettes(mypalettes)

    }, []); 

    
    const generateRandomColors = () => {
        const colors = []

        while(colors.length < 20) {
            const color = chroma.random().hex();
            if(chroma.valid(color)){
                colors.push(color)
            }
        }

        return colors
    }

   
    const addPalette = () => {
        const newPalette = {
            id: new Date().getTime(),
            name: slugify(paletteName),
            createdAt: new Date().getTime(),
            colors: generateRandomColors()
        }

        
        const key = `myPalette-${newPalette.name}`;
        const savedPalette = localStorage.getItem(key)
        if(savedPalette){
            return
        }

        
        localStorage.setItem(key, JSON.stringify(newPalette))
        
        setPopPalettes([...popPalettes, newPalette])

        setLsPalettes([...lsPalettes, newPalette])

        setMyPalettes([...myPalettes, newPalette])

        setPaletteName('')
    }

    return (
        <PalettesStyled>
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                </div>
                <div className="add-palette">
                    <div className="input-control">
                        <input required placeholder='Create Palette...' value={paletteName} onChange={(e) => {
                            setPaletteName(e.target.value)
                        }} type="text"  />
                        <button onClick={() => {
                            addPalette()
                        }}>+</button>
                    </div>
                </div>
            </header>

            <div className="pop-palettes">
                <h2 className='h2-pop'>Popular Palettes</h2>
                <p className="text-with-margin"></p>
                <div className='ppalettes'>
                    {
                        popPalettes.slice(0, 4).map((pal, index) => {
                            return (<Link to={`/poppalettes/${pal.name}`} key={pal.name}>
                                <div className="poppalette">
                                {pal.colors.map((col, i) => {
                                    return (
                                    <div
                                        key={i}
                                        className="popcolor"
                                        style={{ backgroundColor: col }}
                                    ></div>
                                    );
                                })}
                                </div>
                                <p>{pal.name}</p>
                            </Link>
                            );
                        })
                    }
                </div>
            </div>

            <div className="my-palettes">
                <h2 className='h2-my'>Your Palettes</h2>
                <p className="text-margin"></p>
                <div className='mpalettes'>
                    {
                        lsPalettes.map((pal, index) => {
                            return <Link to={`/mypalettes/${pal.name}`} key={pal.name}>
                                <div className="mypalette">
                                    {pal.colors.map((col, i) => {
                                        return <div 
                                            key={i} 
                                            className="mycolor"
                                            style={{backgroundColor: col}}
                                            >
                                            </div>
                                    })}
                                </div>
                                <p>{pal.name}</p>
                            </Link>
                        })
                    }
                </div>
            </div>
        </PalettesStyled >
    )
}


const PalettesStyled = styled.div`
    position: relative;
    z-index: 5;
        .header {
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #232C33;
        color: #fff;
        padding: 10px;
        }
      
        .logo {
        margin-right: 2rem;
        }
      
        .logo-image {
        width: 150px;
        height: auto;
        }

        .pop-palettes {
            padding: 1.5rem;
            .h2-pop{
                flex-grow: 1;
                font-family: Montserrat;
                font-size: 1.5rem;
                font-weight: bold;
                padding: 2rem;
                color: white;
                align-left: 200px;
            }
            .text-with-margin {
                margin-top: 1px;
            }
            .ppalettes{

                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-gap: 25px;
                padding: 0.1rem 8rem;
                transition: all .3s ease;
                    @media screen and (max-width: 1432px){
                        padding: 2rem 10rem;
                    }
                    @media screen and (max-width: 1164px){
                        padding: 2rem 5rem;
                    }
                    @media screen and (max-width: 600px){
                        padding: 1rem 2rem;
                    }
                    a{
                        text-decoration: none;
                        display: inline-block;
                        padding: 1rem;
                        background-color: orange;
                        border-radius: 7px;
                        box-shadow: 1px 3px 20px rgba(0,0,0, 0.2);
                    }
                    p{
                        font-size: 1.5rem;   
                        padding-top: .5rem;
                        display: inline-block;
                        background: #151B1F;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                    .poppalette{
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        width: 100%;
                        height: 150px;
                        .popcolor{
                            width: 100%;
                            height: 100%;
                        }
                    }
                } 
            }
            
        }

        .add-palette{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            margin: 0 auto;
            transition: all .3s ease;
            @media screen and (max-width: 1670px){
                width: 70%;
            }
            @media screen and (max-width: 1320px){
                width: 90%;
            }
            @media screen and (max-width: 970px){
                width: 100%;
                padding-left: 10rem;
                padding-right: 10rem;
            }
            
            @media screen and (max-width: 600px){
                width: 100%;
                padding-left: 4rem;
                padding-right: 4rem;
                padding-top: 2rem;
                padding-bottom: 1.5rem;
            }
            input, button{
                font-family: inherit;
                font-size: inherit;
                outline: none;
                border: none;
                color: #232C33;
            }
            .input-control{
                position: relative;
                width: 100%;
                box-shadow: 1px 4px 15px rgba(0,0,0,0.12);
                input{
                    width: 100%;
                    padding: .5rem 1rem;
                    border-radius: 7px;
                    &::placeholder{
                        color: #232C33;
                        opacity: 0.3;
                    }
                }
                button{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 2px 1rem;
                    cursor: pointer;
                    font-size: 2rem;
                    height: 100%;
                    border-radius: 7px;
                    background-color: orange;
                    color: #232C33;
                    transition: all .3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        background-color: #F3C880;
                    }
                }
            }
        }
        .my-palettes{
            padding: 1.5rem;
            .h2-my{
                flex-grow: 1;
                font-family: Montserrat;
                font-size: 1.5rem;
                font-weight: bold;
                padding: 2rem;
                color: white;
            }
            .text-margin {
                margin-top: 1px;
            }
            
            .mpalettes{
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                grid-gap: 25px;
                padding: 1rem 8rem;
                transition: all .3s ease;
                @media screen and (max-width: 1432px){
                    padding: 2rem 10rem;
                }
                @media screen and (max-width: 1164px){
                    padding: 2rem 5rem;
                }
                @media screen and (max-width: 600px){
                    padding: 1rem 2rem;
                }
                a{
                    text-decoration: none;
                    display: inline-block;
                    padding: 1rem;
                    background-color: orange;
                    border-radius: 7px;
                    box-shadow: 1px 3px 20px rgba(0,0,0, 0.2);
                }
                p{
                    font-size: 1.5rem;   
                    padding-top: .5rem;
                    display: inline-block;
                    background: #151B1F;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .mypalette{
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    width: 100%;
                    height: 150px;
                    .mycolor{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    
`;
export default Palettes
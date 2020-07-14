import React, { useState, useEffect } from 'react';
import Header from './Header';
import './style.css'

function MemeGenerator() {
    const [topText, setTopText] = useState('')
    const [bottomText, setBottomText] = useState('')
    const [randomImg, setRandomImg] = useState('https://blog.hubspot.com/hubfs/how-to-make-a-meme.jpg')
    const [allMemeImg, setAllMemeImg] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                console.log('called')
                setAllMemeImg(response.data.memes)

            })
    },[])

    function handleChangeTop(event) {
        const { value } = event.target
        setTopText(value)
    }

    function handleChangeBottom(event) {
        const {value } = event.target
        setBottomText(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const rendNum = Math.floor(Math.random() * allMemeImg.length)
       
        
        console.log(rendNum)
        const randMemeImg = allMemeImg[rendNum].url 
        console.log(randMemeImg)
        setRandomImg(randMemeImg)
        
    }
    return (
        <div>
            <form className="meme-form">

                <input name='topText' type='text' placeholder='Top text' value={topText} onChange={handleChangeTop}></input>
                <input name='bottomText' type='text' placeholder='Bottom Text' value={bottomText} onChange={handleChangeBottom} ></input>

                <button onClick={handleSubmit}>Gen</button>
                <div className='meme'>
                    <img src={randomImg}></img>
                    <h2 className='top meme-text'>{topText}</h2>
                    <h2 className='bottom meme-text'>{bottomText}</h2>
                </div>

            </form>
        </div>
    )
}

export default MemeGenerator
import "../styles/VideoCard.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../providers/ColorModeProvider";


const VideoCard = ({ data: { heading, text, video, tags } }) => {

    const navigate = useNavigate();

    const { colorMode } = useContext(ColorModeContext);

    const watch = () => {
        navigate(`/watch?src=${video}&title=${heading}&description=${text}`)
    }

    return (
        <div className={`video_card ${colorMode === 'dark' ? 'video_card_dark' : 'video_card_light'}`}>
            <div>
                <h4> {heading} </h4>
                <video src={video}></video>
            </div>

            <div>
                <p> {text} </p>
                <div className={`tags ${colorMode === 'dark' ? 'tags_dark' : 'tags_light'}`}>
                    {tags.map((tag, idx) => {
                        return (
                            <p key={idx}> {tag} </p>
                        )
                    })}
                </div>
            </div>

            <button onClick={watch}> Watch </button>
        </div>
    )
}

export { VideoCard }

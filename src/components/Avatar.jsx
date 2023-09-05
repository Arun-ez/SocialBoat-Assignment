import "../styles/Avatar.css";

const Avatar = ({ src, name }) => {

    return (
        <div className='avatar'>
            <img src={src} alt={name} />
            <p> {name} </p>
        </div>
    )
}

export { Avatar }

const Notfication = ({message}) => {
    if(message) {
        return <p>{message}</p>
    }
    else {
        return null;
    }

}

export default Notfication;
const Notification = ({messageState}) => {
    const style = {
        color: messageState.error ? 'red' : 'green',
        backgroundColor: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (messageState.message === null)
        return null

    return (
        <div style={style}>
            {messageState.message}
        </div>
    )
}

export default Notification
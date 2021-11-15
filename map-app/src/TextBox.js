function TextBox(props) {
    return (
        <div className="TextBox">
            <input
                onChange={(input) => props.setter(input.target.value)}
                type="text"
                placeholder={props.label}/>
        </div>
    );
}

export default TextBox;
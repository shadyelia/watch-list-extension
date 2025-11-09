const AddingListItem = (props) => {
    const { onAdd } = props;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target[0].value.trim();
        const link = e.target[1].value.trim();

        onAdd({ name, link, checked: false });
        e.target[0].value = '';
        e.target[1].value = '';
    }

    return (
        <div>
            <h3>Add New Item</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" required />
                <input type="text" placeholder="Link" />
                <button type="submit">Add</button>
            </form>
        </div>
    )
};

export default AddingListItem;

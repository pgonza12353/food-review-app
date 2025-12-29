export default function RestaurantsPage() {
    return (
        <div className="form-container">
            <h1>Add a New Restaurant</h1>
            <form>
                <div className="form-row">
                    <label>
                        Name: 
                        <input type="text" name="name" />
                    </label>
                </div>
                <br />
                <div className="form-row">
                    <label>
                        Location:
                        <input type="text" name="location" />
                    </label>
                </div>
                <br />
                <div className="form-row">
                    <label>
                        Cuisine:
                        <input type="text" name="cuisine" />
                    </label>
                </div>
                <br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
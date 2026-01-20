"use client";
import { useState } from "react";
import styles from './page.module.css';
export default function RestaurantsPage() {
    const [name, setName] = useState("");           // default empty name
    const [location, setLocation] = useState("");   // default empty location
    const [cuisine, setCuisine] = useState("");     // default empty cuisine
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        console.log("Submitting restaurant:", {
            name,
            location,
            cuisine
        });

        try {
            const res = await fetch('/api/restaurants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'  },
                body: JSON.stringify({ name, location, cuisine }),
            });

            const data = await res.json();

            if(!res.ok){
                console.warn("Validation failed:", data.error);
                alert(`Error: ${data.error}`);    // Simple error feedback
                return;
            }

            console.log("Success: ", data);     // Simple success feedback
            alert("Restaurant added!");
            setName("");
            setLocation("");
            setCuisine("");
        }
        catch (err) {
            console.error("Network error:", err);
            alert("Network error. Try again.");
        }
    }; 
    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
            <h1 className="h1">Add a New Restaurant</h1>
                <div className={styles.formRow}>
                    <label>Name:</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter restaurant name" 
                        />
                </div>
                <div className={styles.formRow}>
                    <label>Location:</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter restaurant location" 
                        />   
                </div>
                <div className={styles.formRow}>
                    <label>Cuisine:</label>
                        <input 
                            type="text" 
                            className={styles.input}
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            placeholder="Enter cuisine type" 
                        />
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
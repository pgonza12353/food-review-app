"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import styles from './page.module.css';

export default function ReviewsPage() {
    const [rating, setRating] = useState(5);            // default rating (5)
    const [review, setReview] = useState<string>("");   // default empty review text
    const [restaurants, setRestaurants] = useState<{id: number; name: string}[]>([]);
    const [selectedRestaurantID, setSelectedRestaurantID] = useState<number | null>(null);
    const { selectedUserID } = useUser();

    useEffect(() => {
        const fetchRestaurants = async () =>{
            try {
                const res = await fetch('/api/restaurants');
                const json = await res.json();
                setRestaurants(json.data);
            } catch (err) {
                console.error("Failed to load restaurants", err);
            }
        };
        fetchRestaurants();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();   
        if(!selectedUserID) {
            alert("Please select a user");
            return;
        }      
        if(!selectedRestaurantID) {
            alert("Please select a restaurant");
            return;
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        console.log("Submitting review:", {
            restaurantId: selectedRestaurantID, 
            userId: selectedUserID, 
            rating, 
            comment: review 
        });

         try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'  },
                body: JSON.stringify({ 
                    restaurantId: selectedRestaurantID, 
                    userId: selectedUserID, 
                    rating, 
                    comment: review 
                }),
            });

            const data = await res.json();

            if(!res.ok){
                console.warn("Error submitting review:", data.error);
                alert(`Error: ${data.error}`);    // Simple error feedback
                return;
            }

            console.log("Success: ", data);     // Simple success feedback
            alert("Review added!");
            setRating(5);
            setReview("");
        }
        catch (err) {
            console.error("Network error:", err);
            alert("Network error. Try again.");
        }
    }; 
    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="card">
                <h1 className="h1">Share Your Thoughts!</h1>
                <div className={styles.formColumn}>
                    <div className={styles.formRow} >
                        <label className={styles.label}>Select Restaurant</label>
                        <select className={styles.select} 
                            value={selectedRestaurantID ?? ""}
                            onChange={(e) => setSelectedRestaurantID(Number(e.target.value))}>
                            <option value="">
                                Select a Restaurant
                            </option>
                            {restaurants.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.label}>Rating (0-10): {rating}</label> 
                            <input 
                                type="range" 
                                className={styles.range}
                                min={0} 
                                max={10} 
                                step={0.5}                        
                                value={rating}
                                onChange={(e) => setRating(parseFloat(e.target.value))} 
                            />
                    </div>
                    <div className={styles.formRowWide}>
                        <label className={styles.label}>
                            Write Review <span className="text-sm">(optional)</span>
                        </label>
                            <textarea 
                                className={styles.textarea}
                                placeholder="Start review"
                                value={review}
                                onChange={(e) => {
                                    setReview(e.target.value)
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                            }}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
    );
}
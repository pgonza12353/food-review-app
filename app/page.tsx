"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import styles from "./page.module.css";

const TEST_USERS = [
    { id: 1, name: "demo_user_1" },
    { id: 2, name: "demo_user_2" },
    { id: 3, name: "demo_user_3" }
];

export default function Home() {
  const { selectedUserID, setSelectedUserID } = useUser();
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if(!selectedUserID) return;

    async function fetchReviews() {
      const res = await fetch(`/api/reviews?userId=${selectedUserID}`);
      const data = await res.json();
      console.log("Fetched reviews: ", data.data);
      setReviews(Array.isArray(data.data) ? data.data : []);
    }

    fetchReviews();
  }, [selectedUserID]);

  return (
    <div className="card">
     <h1 className="h1">Home</h1>
     <div className={styles.selectUser}>
      <label>Select User</label>
      <select
        value={selectedUserID ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedUserID(value === "" ? null : Number(value));
        }}
        className={styles.selectUserRow}
      >
        <option value="">
          Select a User
        </option>
        {TEST_USERS.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
      
      {selectedUserID && (
        <div className={styles.reviewList}>
          <label>My Reviews</label>
          {reviews && reviews.length === 0 ? (
            <p className={styles.reviewBox}>No reviews yet...</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <div className={styles.reviewBox}>
                    <p className={styles.reviewHeading}>{review.restaurant?.name ?? "Unknown restaurant"} - {review.rating}/10</p>
                    {review.comment && <p className={styles.reviewComment}>{review.comment}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );  
}
import { useState } from "react";
import api from "../api/api";

export const useActivities = () => {
    const [activities, setActivities] = useState([]);

    // fetch activities from backend to frontend without manual reload
    const fetchActivities = async (params) => {
        try {
            const res = await api.get("/api/activity",
                {
                    params: params
                }
            )
            setActivities(res.data)

        }
        catch (err) {
            console.log(err.response?.data || err.message);
        }
    }

    const deleteActivities = async () => {
        await api.delete("/api/activity");
    }

    return {
        activities, fetchActivities,deleteActivities
    }
}
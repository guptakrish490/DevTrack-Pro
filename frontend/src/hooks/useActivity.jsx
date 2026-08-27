import { useState } from "react";
import api from "../api/api.js";

export const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(false)

    const fetchActivities = async (params) => {
        try {
            const res = await api.get(`/api/activity?page=${page}&limit=${limit}`, { params: params });

            const hasMoreFlag = res.data.length === limit + 1;
            setHasMore(hasMoreFlag);

            const activitiesPage = hasMoreFlag ? res.data.slice(0, limit) : res.data;

            setActivities(prev => [...prev, ...activitiesPage]);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };


    const deleteActivities = async () => {
        await api.delete("/api/activity");
        setActivities([]);
    };

    return {
        activities,
        fetchActivities,
        deleteActivities,
        setPage,
        setLimit,
        setActivities,
        page,
        hasMore
    };
};

import { useState, useCallback } from "react";
import api from "../api/api.js";

export const useActivities = () => {
    const [activities, setActivities] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchActivities = useCallback(async (params = {}, pageNum = 1, reset = false) => {
        try {
            setLoading(true);
            const res = await api.get(`/api/activity`, {
                params: { ...params, page: pageNum, limit }
            });

            const hasMoreFlag = res.data.length === limit + 1;
            setHasMore(hasMoreFlag);

            const activitiesPage = hasMoreFlag ? res.data.slice(0, limit) : res.data;

            setActivities(prev => reset ? activitiesPage : [...prev, ...activitiesPage]);
        } catch (err) {
            console.error(err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    const deleteActivities = async () => {
        await api.delete("/api/activity");
        setActivities([]);
        setPage(1);
    };

    return {
        activities,
        fetchActivities,
        deleteActivities,
        setPage,
        setLimit,
        setActivities,
        page,
        hasMore,
        loading
    };
};
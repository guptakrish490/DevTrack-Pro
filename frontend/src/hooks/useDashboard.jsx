import { useState } from "react";
import api from "../api/api.js";

export const useDashboard = () => {

    const [data, setData] = useState(null)

    const fetchDashboard = async () => {
        const res = await api.get("/dashboard");
        setData(res.data)
    }

    const handleChange = async (task) => {
        try {
            await api.put(`/api/tasks/${task._id}`,
                {
                    status: "Completed"
                }
            )

            fetchDashboard();
        }
        catch (err) {
            console.log(err.response?.data || err.message)
        }
    }


    return {
        data, fetchDashboard, handleChange
    }

}
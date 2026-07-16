import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const groupByDate = (activities) => {
    const today = dayjs().startOf("day");
    const yesterday = dayjs().subtract(1, "day").startOf("day");

    const grouped = {};

    activities.forEach(activity => {
        const created = dayjs(activity.createdAt);
        const date = created.startOf("day");

        let label;
        if (date.isSame(today)) label = "TODAY";
        else if (date.isSame(yesterday)) label = "YESTERDAY";
        else label = date.format("MMM D");

        if (!grouped[label]) grouped[label] = [];
        grouped[label].push({
            ...activity,
            relativeTime: created.fromNow(),
            exactTime: created.format("MMM D [at] h:mm A")
        });
    });

    return grouped;
};


export default groupByDate;
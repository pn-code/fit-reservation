import moment from "moment";

export function getTimeAgo(datetime: Date) {
    const now = moment();
    const targetDatetime = moment(datetime);

    return targetDatetime.from(now);
}

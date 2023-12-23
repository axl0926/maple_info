import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export default function getDate() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    return dayjs.tz(dayjs(), "Asia/Seoul").hour() >= 1 ? dayjs().subtract(1, "day").format("YYYY-MM-DD") : dayjs().subtract(2, "day").format("YYYY-MM-DD");
}

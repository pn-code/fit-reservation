import { getPrevMonthDateISOString } from "../getPrevMonthDateISOString";

const getDataOnlyFromLastMonth = (data: any[]) => {
    const prevMonthDate = getPrevMonthDateISOString();

    const newData = data.filter((dataObj) => dataObj.createdAt > prevMonthDate);
    return newData;
};

export default getDataOnlyFromLastMonth;

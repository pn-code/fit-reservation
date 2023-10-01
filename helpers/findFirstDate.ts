export const findFirstDate = () => {
    const today = new Date();

    const year = today.getFullYear().toString();
    const month =
        (today.getMonth() + 1).toString().length === 2
            ? `${today.getMonth() + 1}`
            : `0${today.getMonth() + 1}`;
    const day =
        today.getDate().toString().length === 2
            ? `${today.getDate()}`
            : `0${today.getDate()}`;

    return `${year}-${month}-${day}`;
};

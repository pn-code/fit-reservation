const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric" as "2-digit" | "numeric",
        timeZone: "UTC",
    };
    const formattedDate: string = date.toLocaleDateString("en-US", options);

    return formattedDate;
};

export default formatDateString;

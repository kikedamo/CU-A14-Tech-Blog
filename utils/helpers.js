module.exports = {
    format_date: (Date) => {
        return Date.toLocaleDateString();
    },
    format_amount: (Amount) => {
        return parseInt(Amount).toLocaleString();
    },
};
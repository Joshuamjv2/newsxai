export const formatDate = (date) => {
  // Perform date formatting here
    const formattedDate = new Date(date).toLocaleDateString();
    return formattedDate;
    };
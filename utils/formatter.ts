export const getGreeting = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const wibHour = parseInt(formatter.format(new Date()));

  if (wibHour >= 3 && wibHour < 10) {
    return "Good Morning";
  } else if (wibHour >= 10 && wibHour < 15) {
    return "Good Evening";
  } else if ((wibHour >= 18 && wibHour <= 23) || wibHour === 0) {
    return "Good Night";
  } else {
    return "Hello";
  }
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })}`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

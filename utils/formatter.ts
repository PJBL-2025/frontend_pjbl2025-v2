export const getGreeting = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  });

  const wibHour = parseInt(formatter.format(new Date()));

  if (wibHour >= 3 && wibHour < 10) {
    return 'Good Morning';
  } else if (wibHour >= 10 && wibHour < 15) {
    return 'Good Evening';
  } else if ((wibHour >= 18 && wibHour <= 23) || wibHour === 0) {
    return 'Good Night';
  } else {
    return 'Hello';
  }
};

export const formatPrice = (price: number): string => {
    return `${price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })}`;
  };  
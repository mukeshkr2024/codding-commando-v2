export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

export const formatCreatedAtDate = (createdAt) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(createdAt).toLocaleDateString(
    undefined,
    options,
  );
  return formattedDate;
};

export function formatVideoDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);

  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    formattedDuration += `${minutes}mins`;
  }

  return formattedDuration.trim();
}

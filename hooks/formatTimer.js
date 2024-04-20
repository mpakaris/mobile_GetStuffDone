export const formatDuration = (timer) => {
  if (isNaN(timer)) {
    return "00:00";
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

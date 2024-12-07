export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  setImageError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const target = e.target as HTMLImageElement;

  target.src =
    "https://start-tech.ae/wp-content/uploads/2024/03/STARTECH-LOGO-White-1.webp";

  setImageError(true);
};

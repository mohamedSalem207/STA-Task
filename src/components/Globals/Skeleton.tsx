export default function Skeleton({ classNames }: { classNames: string }) {
  return (
    <div
      className={`${classNames} animate-pulse cursor-wait rounded-lg bg-gray-200`}
    />
  );
}

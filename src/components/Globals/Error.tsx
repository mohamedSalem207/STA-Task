export default function Error({ error }: { error: any }) {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      <p className="text-error">
        {error
          ? `${error}${
              (typeof error === "string" && error?.slice(-1) === ".") ||
              error?.slice(-1) === "!"
            }`
            ? ""
            : "."
          : "Something went wrong!"}
      </p>
    </div>
  );
}

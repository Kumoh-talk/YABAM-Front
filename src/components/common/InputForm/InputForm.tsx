export const InputForm = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3 font-medium">
      <span className="px-4 leading-none">{label}</span>
      {children}
    </div>
  );
};

export interface Props {
  src: string;
}

export const StoreImageItem = (props: Props) => {
  return (
    <div className="w-32 h-48 overflow-hidden rounded-lg border border-gray-500">
      <img
        src={props.src}
        alt=""
        className="w-full h-full object-cover outline-none"
      />
    </div>
  );
};

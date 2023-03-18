export interface Props {
  title: string;
  subtitle: string;
  placeholder: string;
  action: string;
  className?: string;
}

function Newsletter(
  { title, subtitle, placeholder, action, className }: Props,
) {
  return (
    <div
      className={`bg-gray-200 py-44 flex justify-center items-center flex-col ${className}`}
    >
      <div className="text-center w-full">
        <div>
          <h4 className="font-bold text-lg">{title}</h4>
        </div>
        <div>
          <span className="text-sm">{subtitle}</span>
        </div>
      </div>
      <div className="flex mt-2">
        <div>
          <input
            type="text"
            placeholder={placeholder}
            className="h-12 py-2 px-3"
          />
        </div>
        <div>
          <button className="h-12 py-2 px-3 bg-interactive text-white">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;

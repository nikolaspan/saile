export default function Card({
    title,
    description,
    icon,
  }: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-white">
        <div className="flex items-center space-x-4">
          {icon && <div>{icon}</div>}
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    );
  }
  
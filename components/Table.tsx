type TableProps<T extends object> = {
    columns: (keyof T)[];
    data: T[];
  };
  
  export default function Table<T extends object>({
    columns,
    data,
  }: TableProps<T>) {
    return (
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col)} className="px-4 py-2 border bg-gray-100">
                {String(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col)} className="px-4 py-2 border">
                  {row[col] as string}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
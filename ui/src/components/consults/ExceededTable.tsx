"use client";

export interface ExceededTableProp {
    Name: string,
    OverLimit: number,
}

const ExceededTable: React.FC<{ Data: ExceededTableProp[] }> = ({ Data }) => {

    return (
        <div>
            <table className="w-full table-fixed border-collapse border rounded-xl border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                        <th className="border border-gray-300 dark:border-gray-900 p-2 text-left w-1/3">
                            Name
                        </th>
                        <th className="border border-gray-300 dark:border-gray-900 p-2 text-left w-1/3">
                            Over Limit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map(item => (
                        <tr key={item.Name} className="odd:bg-gray-100 dark:odd:bg-gray-700">
                            <td className="border text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-900 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                {item.Name}
                            </td>
                            <td className="border text-gray-800 dark:text-gray-400 border-gray-300 dark:border-gray-900 p-2 overflow-hidden max-w-xs whitespace-nowrap m-1">
                                {item.OverLimit}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExceededTable;
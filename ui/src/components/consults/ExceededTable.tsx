"use client";

export interface ExceededTableProp {
    Name: string,
    OverLimit: number,
}

const ExceededTable: React.FC<{ Data: ExceededTableProp[] }> = ({ Data }) => {

    return (
        <div>
            <table className="styleTable">
                <thead>
                    <tr className="headRowTable">
                        <th className="headColumn">
                            Name
                        </th>
                        <th className="headColumn">
                            Over Limit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Data.map(item => (
                        <tr key={item.Name} className="rowTable">
                            <td className="rowData">
                                {item.Name}
                            </td>
                            <td className="rowData">
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
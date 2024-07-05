import { useEffect, useState } from "react";
import DataGridDemo from "./DataGridTable";
import CheckBoxData from "../Component_2/CheckBoxData";

export interface DataTypeProps {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const Data = () => {
    const [data, setData] = useState<DataTypeProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: DataTypeProps[] = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <DataGridDemo data={data} />;
            <div className="pl-8">
                <CheckBoxData />
            </div>
        </>
    )
};

export default Data;

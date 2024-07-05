import React, { useState } from 'react';
import ParentCheckbox from './ParentCheckBox';

interface Department {
    department: string;
    sub_departments: string[];
}

const data: Department[] = [
    {
        "department": "customer_service",
        "sub_departments": [
            "support",
            "customer_success"
        ]
    },
    {
        "department": "design",
        "sub_departments": [
            "graphic_design",
            "product_design",
            "web_design"
        ]
    }
];

const CheckBoxData: React.FC = () => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    console.log(selectedDepartments)

    const handleParentChange = (department: string, isChecked: boolean) => {
        if (isChecked == true) {
            setSelectedDepartments((prevSelected) => [...prevSelected, department]);
        } else {
            setSelectedDepartments((prevSelected) => prevSelected.filter((item) => item !== department));
        }
    };

    return (
        <div>
            {data.map((dept) => (
                <ParentCheckbox
                    key={dept.department}
                    department={dept.department}
                    subDepartments={dept.sub_departments}
                    onParentChange={handleParentChange}
                />
            ))}
            <hr />
            <h3>Selected Departments:</h3>
            <ul>
                {selectedDepartments.map((dept) => (
                    <li key={dept}>{dept}</li>
                ))}
            </ul>
        </div>
    );
};

export default CheckBoxData;

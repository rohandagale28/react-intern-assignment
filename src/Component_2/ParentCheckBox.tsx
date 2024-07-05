import React, { useState, useEffect } from 'react';
import CheckBox from '../components/shared/CheckBox';
import { Button } from '@mui/material';

interface ParentCheckboxProps {
    department: string;
    subDepartments: string[];
    onParentChange: (department: string, isChecked: boolean) => void;
}

const ParentCheckbox: React.FC<ParentCheckboxProps> = ({ department, subDepartments, onParentChange }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [subDepartmentsChecked, setSubDepartmentsChecked] = useState<{ [key: string]: boolean }>({});
    const [expand, setExpand] = useState(false);
    const [totalSubDepartments, setTotalSubDepartments] = useState<number>(0);

    useEffect(() => {
        const initialSubDepartmentsChecked = subDepartments.reduce((acc: { [key: string]: boolean }, subDept) => {
            acc[subDept] = false;
            return acc;
        }, {});
        setSubDepartmentsChecked(initialSubDepartmentsChecked);
        setTotalSubDepartments(subDepartments.length);
    }, [subDepartments]);

    const handleParentChange = (checked: boolean) => {
        setIsChecked(checked);
        onParentChange(department, checked);

        // Update all sub-departments checked status
        const updatedSubDepartmentsChecked = Object.fromEntries(
            Object.keys(subDepartmentsChecked).map(key => [key, checked])
        );
        setSubDepartmentsChecked(updatedSubDepartmentsChecked);
    };

    // Handle change for individual sub-departments
    const handleSubDepartmentChange = (subDept: string, checked: boolean) => {
        setSubDepartmentsChecked(prev => ({
            ...prev,
            [subDept]: checked,
        }));
        const allChecked = Object.values({ ...subDepartmentsChecked, [subDept]: checked }).every(Boolean);
        setIsChecked(allChecked);
        onParentChange(department, allChecked);
    };

    const handleExpandCollapse = () => {
        setExpand(!expand);
    };

    return (
        <div>
            <div className='flex flex-row items-center'>
                <Button onClick={handleExpandCollapse}>
                    {expand ? '-' : '+'}
                </Button>
                <CheckBox label={department} checked={isChecked} onChange={(checked) => handleParentChange(checked)} />
                <p className='pl-2'>&#40;{totalSubDepartments}&#41;</p>
            </div>
            {expand && (
                <div className='pl-24'>
                    {subDepartments.map((subDept) => (
                        <div key={subDept}>
                            <CheckBox
                                label={subDept}
                                checked={subDepartmentsChecked[subDept] || false}
                                onChange={(checked) => handleSubDepartmentChange(subDept, checked)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ParentCheckbox;

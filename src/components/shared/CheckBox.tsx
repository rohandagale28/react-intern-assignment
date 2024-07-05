import { Checkbox } from '@mui/material';
import React from 'react';

interface CheckBoxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => (
    <label>
        <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} />
        {label}
    </label>
);

export default CheckBox;

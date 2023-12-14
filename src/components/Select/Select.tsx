import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { User } from '../../services/services';


interface SelectProps {
    handleChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void, 
    menuItemsValues: User[]
    inputLabel: string,
    value: string
}
export default function BasicSelect ({value, handleChange,  menuItemsValues,inputLabel}: SelectProps) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={inputLabel}
          onChange={handleChange}
          className="users-select"
        >
          {menuItemsValues?.map((user) => <MenuItem data-testid='select-item' className="menu-btn" value={user.name}>{`${user.name} - Id ${user.id}`}</MenuItem>)}
         
        </Select>
      </FormControl>
    </Box>
  );
}
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, ListItemIcon } from "@mui/material";
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AnimationIcon from '@mui/icons-material/Animation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

export const CATEGORIES = [
  { value: "action", label: "Action", Icon: SportsMartialArtsIcon },
  { value: "comedy", label: "Comedy", Icon: TheaterComedyIcon },
  { value: "drama", label: "Drama", Icon: FamilyRestroomIcon },
  { value: "scifi", label: "Sci-Fi", Icon: RocketLaunchIcon },
  { value: "romance", label: "Romance", Icon: FavoriteIcon },
  { value: "animation", label: "Animation", Icon: AnimationIcon },
  { value: "documentary", label: "Documentary", Icon: MenuBookIcon },
  { value: "horror", label: "Horror", Icon: BloodtypeIcon },
];

const CategorySelect = ({ selectedCategories, onChange, label = "Categories", size = "medium", sx = {} }) => {
  return (
    <FormControl size={size} sx={{ minWidth: 150, ...sx }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selectedCategories}
        onChange={(e) => onChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
        renderValue={(selected) => 
          selected.map(val => CATEGORIES.find(c => c.value === val)?.label).filter(Boolean).join(", ")
        }
        label={label}
      >
        {CATEGORIES.map((category) => (
          <MenuItem key={category.value} value={category.value}>
            <Checkbox checked={selectedCategories.indexOf(category.value) > -1} />
            <ListItemIcon>
              <category.Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={category.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;

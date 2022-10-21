import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a, b) {
    return [...a, ...not(b, a)];
  }


const TransferList = () => {

    const data = [
        {
            "Standard_name": "Sea water temperature",
            "Variable_name": "Temp",
            "name_data": "TEMP",
            "info": [
                {
                    "Units": "Degree celsius",
                    "Min_value": 0.0,
                    "Max_value": 36.0
                }
            ]
        },
        {
            "Standard_name": "Sea water electrical conductivity",
            "Variable_name": "Cndc",
            "name_data": "CNDC",
            "info": [
                {
                    "Units": "S/m",
                    "Min_value": 0.0,
                    "Max_value": 60.0
                }
            ]
        },
        {
            "Standard_name": "Sea water practical salinity",
            "Variable_name": "Psal",
            "name_data": "PSAL",
            "info": [
                {
                    "Units": "Psu",
                    "Min_value": 34.0,
                    "Max_value": 38.0
                }
            ]
        },
        {
            "Standard_name": "Mass concentration of oxygen in sea water was dissolved oxygen",
            "Variable_name": "Doxy",
            "name_data": "DOXY",
            "info": [
                {
                    "Units": "Micromol/l",
                    "Min_value": 100.0,
                    "Max_value": 260.0
                }
            ]
        },
        {
            "Standard_name": "Total chlorophyll-a",
            "Variable_name": "Cphl",
            "name_data": "CPHL",
            "info": [
                {
                    "Units": "Microgrammes/l",
                    "Min_value": -3.0,
                    "Max_value": 3.0
                }
            ]
        }
    ]

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(data);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };
  
    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };
  
    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const btnClick = () => {
      console.log(right)

    };
    const customList = (title, items) => (
        <Card >
          <CardHeader
            sx={{ px: 2, py: 1 }}
            avatar={
              <Checkbox
                onClick={handleToggleAll(items)}
                checked={numberOfChecked(items) === items.length && items.length !== 0}
                indeterminate={
                  numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{
                  'aria-label': 'all items selected',
                }}
              />
            }
            title={title}
            subheader={`${numberOfChecked(items)}/${items.length} selected`}
          />
          <Divider />
          <List
            sx={{
              width: 200,
              height: 290,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
            dense
            component="div"
            role="list"
          >
            {items.map((value, idx) => {
              const labelId = `transfer-list-all-item-${value}-label`;
    
              return (
                <ListItem
                  key={idx}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.name_data} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Card>
      );


    return (
        <div className='row'>
        <Grid container spacing={2} className='mt-4 d-flex justify-content-end '>
        <Grid item >{customList('Properties', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('Chosen', right)}</Grid>
      </Grid>
        <div className="row mt-3">
          <div className='col-md-12 d-flex justify-content-end'>
            <button className='btn btn-primary' disabled={right.length > 0 ? false : true} onClick={() => btnClick()}>Generate Plot</button>
          </div>
        </div>
      </div>
    );
}

export default TransferList;

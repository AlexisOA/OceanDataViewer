import React, {useState} from 'react';
import  TreeView from '@mui/lab/TreeView/TreeView';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import SvgIcon from '@mui/material/SvgIcon';
import '../SelectCatalogs/SelectCatalogs.css';
import { getCoordinatesFromLocalFile } from '../../services/ThreddsService';

function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }
  
  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }

  function CloseSquare(props) {
    return (
      <SvgIcon
        className="close"
        fontSize="inherit"
        style={{ width: 14, height: 14 }}
        {...props}
      >
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    );
  }

const SelectCatalogs = ({send}) => {
    const data = {
      "id": "Thredds PLOCAN",
      "name": "Thredds PLOCAN",
      "url": "http://data.plocan.eu/thredds/catalog.xml",
      "children": [
          {
              "id": "ESTOC",
              "name": "ESTOC",
              "url": "http://data.plocan.eu/thredds/catalog/estoc/catalog.xml",
        "is_file": false,
              "children": [
          {
            "id": "ship-based",
            "name": "ship-based",
            "url": "http://data.plocan.eu/thredds/catalog/estoc/ship-based/catalog.xml",
            "is_file": false,
            "children": [
              {
                "id": "OS_ESTOC_201902_D_CTD-P3",
                "name": "OS_ESTOC_201902_D_CTD-P3",
                "url": "C:\Users\Plocan8\Documents\files_netcdf\OS_ESTOC_201902_D_CTD-P3.nc",
                "is_file": true
              },
              {
                "id": "OS_ESTOC_201902_D_CTD-P4",
                "name": "OS_ESTOC_201902_D_CTD-P4",
                "url": "C:\Users\Plocan8\Documents\files_netcdf\OS_ESTOC_201902_D_CTD-P4.nc",
                "is_file": true
              },
              {
                "id": "OS_ESTOC_201912_D_CTD-P1",
                "name": "OS_ESTOC_201912_D_CTD-P1",
                "url": "C:\Users\Plocan8\Documents\files_netcdf\OS_ESTOC_201912_D_CTD-P1.nc",
                "is_file": true
              },
              {
                "id": "OS_ESTOC_201912_D_CTD-P2",
                "name": "OS_ESTOC_201912_D_CTD-P2",
                "url": "C:\Users\Plocan8\Documents\files_netcdf\OS_ESTOC_201912_D_CTD-P2.nc",
                "is_file": true
              },
              {
                "id": "OS_ESTOC-1_200803_D_CTD-DO",
                "name": "OS_ESTOC-1_200803_D_CTD-DO",
                "url": "C:\Users\Plocan8\Documents\files_netcdf\OS_ESTOC-1_200803_D_CTD-DO.nc",
                "is_file": true
              }
            ]
          },
          {
            "id": "mooring-watercolumn",
            "name": "mooring-watercolumn",
            "url": "http://data.plocan.eu/thredds/catalog/estoc/mooring-watercolumn/catalog.xml",
            "is_file": false,
            "children": []
          },
          {
            "id": "buoy-surface",
            "name": "buoy-surface",
            "url": "http://data.plocan.eu/thredds/catalog/estoc/buoy-surface/catalog.xml",
            "is_file": false,
            "children": []
          }
        ]
          },
          {
              "id": "Pub",
              "name": "Pub",
              "url": "http://data.plocan.eu/thredds/catalog/aggregate/public/catalog.xml",
              "is_file": false,
              "children": []
          },
          {
              "id": "Marine_Maritime_Monitoring_Network_Macaronesia_R3M",
              "name": "Marine_Maritime_Monitoring_Network_Macaronesia_R3M",
              "url": "http://data.plocan.eu/thredds/catalog/r3m/catalog.xml",
              "is_file": false,
              "children": []
          },
          {
              "id": "Test",
              "name": "Test",
              "url": "http://data.plocan.eu/thredds/catalog/aggregate/private/catalog.xml",
              "is_file": false,
              "children": []
          },
          {
              "id": "Gliders",
              "name": "Gliders",
              "url": "http://data.plocan.eu/thredds/catalog/glider/catalog.xml",
              "is_file": false,
              "children": []
          }
      ]
  };

  const [markers, setMarkers] = useState(null);
      
    const renderTree = (nodes) => (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => send(nodes.is_file, nodes.id)}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );

    return (
        <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<MinusSquare />}
      defaultExpanded={['root']}
      defaultExpandIcon={<PlusSquare />}
    //   defaultEndIcon={<CloseSquare />}
      sx={{ height: 500, flexGrow: 1, maxWidth: 500, overflow: "auto", fontSize: "0.5rem"}}
    >
      {renderTree(data)}
    </TreeView>
    );
}

export default SelectCatalogs;

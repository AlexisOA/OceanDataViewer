import React, {useState} from 'react';
import  TreeView from '@mui/lab/TreeView/TreeView';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import SvgIcon from '@mui/material/SvgIcon';
import { getAllCatalogs, getCatalogByURL } from '../../../services/ThreddsService';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { InsertDriveFile } from "@mui/icons-material";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        {/* <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" /> */}
        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zM9 12.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clipRule="evenodd" />
      </SvgIcon>

    );
  }
  
  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        {/* <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" /> */}
        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
      </SvgIcon>

    );
  }

  function FolderOpen(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        {/* <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" /> */}
        <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z" /><path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z" clipRule="evenodd" />
      </SvgIcon>

    );
  }

  
const EstocCatalogs = ({send}) => {

    const [layerList, setLayerList] = useState(null);

    const obtainLayers = () => {
        console.log("En obtainlayer base")
        getAllCatalogs()
        .then((response) => {
            if(response.status === 200){
                setLayerList(response.data);
            }
        })
        .catch((error) => alert(`Error loading thredds catalog: ${error}`))
        
          
      }


    const renderTree = (nodes) => (
        <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        onClick={() => checkTree(nodes.is_file, nodes.id, nodes.url, nodes.url_download)}
        endIcon={nodes.is_file ? <AnalyticsOutlinedIcon/> : <FolderIcon/>}
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      );

    const checkTree = (is_file, id, url, url_download) => {
      (is_file) ?
      send(is_file, url, url_download)
      : 
      obtainLayerByURL(url, id);
    }

    const obtainLayerByURL = (url, name) => {
      console.log("obtainlayersbyURL: ", url)
      getCatalogByURL(url)
          .then((response) => {
            console.log(response.data)
              const aux = updateTree(layerList)(
                  (node) => 
                      node?.id === name
                      ?
                      { ...node, children: response.data }
                      :
                      node
              )
              setLayerList({
                  ...aux
              })
              
          })
          .catch((error) => alert(`Error method post: ${error}`))
    }

    const updateTree = (node) => (updater) => {
      const updatedNode = updater(node)
      return {
           ...updatedNode,
          children:
              updatedNode?.children &&
              updatedNode?.children.map((subTree) => updateTree(subTree)(updater))
      }
    };
  
    return (
        <div>
        {
          layerList != null ?
          (
            <TreeView
              aria-label="rich object"
              defaultCollapseIcon={<MinusSquare/>}
              defaultExpanded={['root']}
              defaultExpandIcon={<PlusSquare />}
              // defaultEndIcon={<FolderIcon />}
              sx={{ height: "100vh", flexGrow: 1, maxWidth: 500, overflow: "auto", fontSize: "0.5rem"}}
            >
              {renderTree(layerList)}
            </TreeView>
          )
          :
          (
            obtainLayers()
          )
        }
      </div>
    );
}

export default EstocCatalogs;

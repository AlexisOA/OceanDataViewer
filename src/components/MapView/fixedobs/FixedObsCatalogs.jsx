import React, {useState} from 'react';
import  TreeView from '@mui/lab/TreeView/TreeView';
import TreeItem from '@mui/lab/TreeItem/TreeItem';
import SvgIcon from '@mui/material/SvgIcon';
import { getAllCatalogs, getCatalogByURL } from '../../../services/ThreddsService';

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
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => checkTree(nodes.is_file, nodes.id, nodes.url)}>
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      );

    const checkTree = (is_file, id, url) => {
      (is_file) ?
      send(is_file, url)
      : 
      obtainLayerByURL(url, id);
    }

    const obtainLayerByURL = (url, name) => {
      console.log("obtainlayersbyURL: ", url)
      getCatalogByURL(url)
          .then((response) => {
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
            //   defaultEndIcon={<CloseSquare />}
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

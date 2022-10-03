import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import estoc_card from '../../assets/images/cards/estoc_card.PNG';
import plocanportal_card from '../../assets/images/cards/plocanportal_card.PNG';
import gliders_card from '../../assets/images/cards/gliders_card.jpg';
import {useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const redirectToPath = (path) => {
    navigate(path)
  }

    return (
      <div className='container'>
      <div className='row m-3'>
      <div className="col-12">
            <h1 className="text-center">Plocan Data Observatory</h1>
          </div>
      </div>

        <div className='row p-2 m-4'>
          <div className='col-md-4'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="180"
                    image={estoc_card}
                    alt="estoc platform"
                    onClick={()=> redirectToPath("/estoc")}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ESTOC
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estoc description
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </div>

          <div className='col-md-4'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => redirectToPath("/gliders")}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={gliders_card}
                    alt="estoc platform"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Gliders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gliders description
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </div>

          <div className='col-md-4'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href='http://obsplatforms.plocan.eu/' target={"_blank"}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={plocanportal_card}
                    alt="estoc platform"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      PLOCAN Data Portal
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      PLOCAN Data Portal description
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
          </div>

        </div>
      </div>
      
        
    );
}

export default Home;

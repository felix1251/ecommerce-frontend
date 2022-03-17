import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "../components/pagination.css"

const ImgMediaCard = ({ item }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    var total = 0
    for(let i = 0 ; i < item.reviews.length; i++){
      total += item.reviews[i].rating
    }
    setRating(total/item.reviews.length)
  }, [item]);

  return (
    <Grid item md={3} style={{ margin: "0px" }}>
      <Card>
        <CardActionArea component={Link} to={`/product/${item._id}`}>
          <CardMedia
            style={{ objectFit: "cover" }}
            component="img"
            alt={item.title}
            height="280"
            image={item.img[0]}
            title={item.title}
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography gutterBottom style={{ fontSize: "24px", fontWeight: "550" }} >
                ₱ {item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Typography>
              <Rating ratingValue={(rating / 5 * 100)} size={28} iconsCount={5} readonly={true} />
            </div>
            <Typography gutterBottom style={{ fontSize: "17px" }} >
              {item.title.length >= 35 ? item.title.slice(0, 35) + "..." : item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button style={{ width: "100%", backgroundColor: "yellow", fontWeight: "800" }} component={Link} to={`/product/${item._id}`} >
            <Visibility /> View product
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}


export default ImgMediaCard;